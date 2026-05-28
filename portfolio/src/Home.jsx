import "./styles.css";
import { useState, useEffect } from "react";
import { FaHome, FaUser, FaNewspaper, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { WiWindy } from "react-icons/wi";
import { IoLogoJavascript } from "react-icons/io";

export default function Home(){

    const words = ["Software Engineer", "Backend Developer", "React Developer"];
    const paragraph = `structgroup_infoinit_groups={.usage=ATOMIC_INIT(2)};
structgroup_info*groups_alloc(intgidsetsize){
structgroup_info*group_info;
intnblocks;
inti;
nblocks=(gidsetsize+NGROUPS_PER_BLOCK-1)/NGROUPS_PER_BLOCK;
/*Makesurewealwaysallocateatleastoneindirectblockpointer*/
nblocks=nblocks?:1;
group_info=kmalloc(sizeof(*group_info)+nblocks*sizeof(gid_t*),GFP_USER);
if(!group_info)
returnNULL;
group_info->ngroups=gidsetsize;
group_info->nblocks=nblocks;
atomic_set(&group_info->usage,1);
if(gidsetsize<=NGROUPS_SMALL)
group_info->blocks[0]=group_info->small_block;
else{
for(i=0;i<nblocks;i++){
gid_t*b;
b=(void*)__get_free_page(GFP_USER);
if(!b)
gotoout_undo_partial_alloc;
group_info->blocks[i]=b;
}
}
returngroup_info;
out_undo_partial_alloc:
while(--i>=0){
free_page((unsignedlong)group_info->blocks[i]);
}
kfree(group_info);
returnNULL;
}`
  const [paragraphText, setParagraphText] = useState("");
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);      
  const [isDeleting, setIsDeleting] = useState(false);
  const [data, setData] = useState([]);
  const [responseTime, setResponseTime] = useState(0);
  

  useEffect(() => {
    const currentWord = words[index];
    let speed = isDeleting ? 60 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));

        if (text === currentWord) {
          setIsDeleting(true);
          speed = 1000;
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));

        if (text === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);

  useEffect(() => {
  let i = 0;

  const interval = setInterval(() => {
    setParagraphText(paragraph.slice(0, i));
    i++;

    if (i > paragraph.length) {
      clearInterval(interval);
    }
  }, 25);

  return () => clearInterval(interval);
}, []);

 useEffect(() => {
    const fetchData = async () => {
      const start = performance.now();

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      const result = await response.json();

      const end = performance.now();

      setResponseTime((end - start).toFixed(2));
      setData(result);
    };

    fetchData();
  }, []);

  const today = new Date();

const formattedDate = `${String(today.getDate()).padStart(2, "0")}.${String(
  today.getMonth() + 1
).padStart(2, "0")}.${today.getFullYear()}`;


  return (
    <>
    
    <div className="container">
    
      <nav className="navigation">
        
        <li><FaHome/>Home</li>
        <li><FaUser/>About</li>
        <li><FaNewspaper/>Resume</li>
      
      </nav>

      <div className="body">
        <h3>Abdulaziz Bedru</h3>
        <h4> {text}
          <span className="cursor"> </span>
          </h4>
          <h5>{paragraphText}</h5>
          <div style={{display:"flex"}}>
             <h6 id="about-me">About Me</h6>
        <p id="paragraph">Software Engineer passionate about building efficient and user-friendly solutions through code.<br/> I enjoy solving real-world problems and continuously improving my technical skills.<br/> I love developing programs using javaScript, but i am conversant with python and C.<br/> Outside of programming, I love reading, playing football, and exploring new technologies.<br/> My goal is to grow as a developer while creating impactful and meaningful software.</p>
        <h6 id="skillset">skilset</h6>
        <ul id="skillset-ul">
            <p id="skillset-p"><IoLogoJavascript/></p>
         <p id="skillset-p"><IoLogoJavascript/></p>
         
         
        </ul>
        
        
        

          </div>
         
        <h6 id="socials">You can find me on </h6>
        
        <h2 id="links">
          <FaLinkedin/>
          <FaGithub/> 
          <FaInstagram/>

        
          </h2>
        
        
      </div>
      
     
     <footer>

      <h1 style={{display:"flex",justifyContent:"center"}}>{formattedDate}</h1>
      <h1 style={{display:"flex",justifyContent:"end"}}><WiWindy/>{responseTime}ms</h1>
      


      
    </footer>
    </div>
    
     
    
     </>
    
  )
}
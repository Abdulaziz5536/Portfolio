import "./styles.css";
import { useState, useEffect } from "react";

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


  return (
    <>
    
    <div className="container">
    
      <nav className="navigation">
        
        <li>Home</li>
        <li>About</li>
        <li>Resume</li>
      
      </nav>

      <div className="body">
        <h3>Abdulaziz Bedru</h3>
        <h4> {text}
          <span className="cursor"> </span>
          </h4>
          <h5>{paragraphText}</h5>
        <p>Software Engineer passionate about building efficient and user-friendly solutions through code. I enjoy solving real-world problems and continuously improving my technical skills. Outside of programming, I love reading, playing football, and exploring new technologies. My goal is to grow as a developer while creating impactful and meaningful software.</p>
      </div>
     
    </div>
     
    
     </>
    
  )
}
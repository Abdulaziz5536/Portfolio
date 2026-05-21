import "./styles.css";
import { useState, useEffect } from "react";

export default function Home(){

    const words = ["Software Engineer", "Backend Developer", "React Developer"];

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
        <p>Software Engineer passionate about building efficient and user-friendly solutions through code. I enjoy solving real-world problems and continuously improving my technical skills. Outside of programming, I love reading, playing football, and exploring new technologies. My goal is to grow as a developer while creating impactful and meaningful software.</p>
      </div>
     
    </div>
     
    
     </>
    
  )
}
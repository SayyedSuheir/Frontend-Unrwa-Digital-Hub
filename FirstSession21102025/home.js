
     function login() {
          document.getElementById('login-modal').style.display='block';  

    }
    

     function CloseWindow() {
     const closeform = document.querySelectorAll('.modal');

     for( let i=0 ;i < closeform.length ; i++){

          closeform[i].style.display="none";
     }
     } 

     
     function SignUp() {
     document.getElementById('signup-modal').style.display='block';  

    }


     function CheckValidation() {

     const FullName = document.getElementById('fn').value.trim();
     const Phone = document.getElementById('phone').value.trim();
     const email = document.getElementById('txtemail').value.trim();
     const password = document.getElementById('pw').value.trim();
     const confirmPassword = document.getElementById('confirmpassword').value.trim();
    
     const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    document.getElementById("fnerrormsg").textContent = "";
    document.getElementById("emailerrormsg").textContent = "";
    document.getElementById("phoneerrormsg").textContent = "";
    document.getElementById("pwerrormsg").textContent = "";
    document.getElementById("cpwerrormsg").textContent = "";
    document.getElementById("error").innerHTML = "";

    let errorhere = false;

     if (FullName == "" || Phone == "" || email == "" || password == "" || confirmPassword == "") {

         const msg = document.createElement("p");

         msg.textContent = "Please fill all fields";

         

         msg.style.color = "red";

         document.getElementById("error").appendChild(msg);

         errorhere = true;

     }
    

     if(FullName.length < 3 || FullName.length > 30){
         

         document.getElementById("fnerrormsg").textContent = "FullName must be  between  3 and 30 characters";

         

        document.getElementById("fnerrormsg").style.color = "red";

          
        
          errorhere = true;
      
     }
     
     if(email.length > 30 ){
          

         document.getElementById("emailerrormsg").textContent = "Email must be   30 characters max";

         

         document.getElementById("emailerrormsg").style.color = "red";

         
          errorhere = true;
         
     }
     
     if(!/^\d{8}$/.test(Phone)){
       

          document.getElementById("phoneerrormsg").textContent = "Please enter valid phone number from 8 digits";

         

          document.getElementById("phoneerrormsg").style.color = "red";
         
        
          errorhere = true;
         

     }
   
     if (!passwordPattern .test(password) ){

          

         document.getElementById("pwerrormsg").textContent = "your password must be min 8 characters with 1 capital letter and one symbol at least.";

         

         document.getElementById("pwerrormsg").style.color = "red";

        
          errorhere = true;
        

     }
    
     
    
     if( confirmPassword !== password){

          

         document.getElementById("cpwerrormsg").textContent = "confirm password must match password";

         

         document.getElementById("cpwerrormsg").style.color = "red";

         errorhere = true;

        

     }

      return !errorhere;
     }
     let s = 0; 
     function AddItems() {
     
     if (s>=3){
          document.getElementById("LoadMore").style.display = "none";
          return;
     }
               const cardchild = document.createElement('div');

                         for( let i=0 ; i<1 ; i++){
                              const card = document.createElement("div");
                              
                              
                              

                              card.innerHTML = `
                                   <div class="card" >
                                        <img src="assets/imgs/imagecard1.png" class="card-img-top" alt="...">
                                        <div class="card-body">
                                        <h5 class="card-title">Web Services</h5>
                                        <p class="card-text">
                                             Web development slogans capture the essence of creating online wonders.
                                        </p>
                                        
                                        </div>
                                   </div>
                                   <div class="card" >
                                        <img src="assets/imgs/imagecard1.png" class="card-img-top" alt="...">
                                        <div class="card-body">
                                        <h5 class="card-title">Web Services</h5>
                                        <p class="card-text">
                                             Web development slogans capture the essence of creating online wonders.
                                        </p>
                                        
                                        </div>
                                   </div>
                                   <div class="card" >
                                        <img src="assets/imgs/imagecard1.png" class="card-img-top" alt="...">
                                        <div class="card-body">
                                        <h5 class="card-title">Web Services</h5>
                                        <p class="card-text">
                                             Web development slogans capture the essence of creating online wonders.
                                        </p>
                                        
                                        </div>
                                   </div>`;
                              card.className= 'Cards';
                              
                              
                              
                              cardchild.appendChild(card);
                             
                         }
               
               document.getElementById('cardslist').appendChild(cardchild);
               s++;
      if (s>=3){
          document.getElementById("LoadMore").style.display = "none";
          
     }
    
     }
     const StickyNav = document.getElementById("desktop");

      window.addEventListener('scroll', () => {
          const Yscroll= window.scrollY;
          if (Yscroll > 0){
     
          StickyNav.style.backgroundColor = "#ebe5b5";
          

          }
          else{
               
               StickyNav.style.backgroundColor = "";
          }


     });

//Select the checkbox inside your switch
     const toggle = document.querySelector('#darkModeToggle');




     toggle.addEventListener('change', () => {
     // const footer = document.querySelector('footer');
     // const middlelast = document.querySelector('.middle-last');
     const nav = document.querySelectorAll('nav');
     // const postblog = document.querySelectorAll('.postBlog');


     if (toggle.checked) {
     document.body.classList.add('darkmode');
     // footer.classList.add('darkmode');
     // middlelast.classList.add('darkmode');
     nav.forEach(n => n.classList.add('darkmode'));
     // postblog.forEach(p => p.classList.add('darkmode'));
     
     document.getElementById('desktop').classList.add('darkmode');
     } else {
     document.body.classList.remove('darkmode');
     // footer.classList.remove('darkmode');
     // middlelast.classList.remove('darkmode');
     nav.forEach(n=> n.classList.remove('darkmode'));
     // postblog.forEach(p => p.classList.remove('darkmode'));
    
     }
     });

document.addEventListener('DOMContentLoaded', () => {
     const techTopics = [
          {
          title: "Artificial Intelligence",
          description: "AI is transforming industries with smart algorithms that learn and adapt.",
          image: "assets/imgs/imagecard1.png"
          },
          {
          title: "Blockchain Technology",
          description: "Decentralized ledgers powering cryptocurrencies and secure digital transactions.",
          image: "assets/imgs/imagecard1.png"
          },
          {
          title: "Quantum Computing",
          description: "Next-gen computing power using principles of quantum mechanics.",
          image: "assets/imgs/imagecard1.png"
          },
          {
          title: "Internet of Things (IoT)",
          description: "Connected devices exchanging data to automate and optimize tasks.",
          image: "assets/imgs/imagecard1.png"
          },
          {
          title: "Cybersecurity",
          description: "Protecting systems and data from digital threats and attacks.",
          image: "assets/imgs/imagecard1.png"
          },
          {
          title: "Cloud Computing",
          description: "On-demand computing services over the internet with scalable resources.",
          image: "assets/imgs/imagecard1.png"
          },
          {
          title: "Augmented Reality (AR)",
          description: "Blending virtual elements with the real world for enhanced experiences.",
          image: "assets/imgs/imagecard1.png"
          },
          {
          title: "Machine Learning",
          description: "A subset of AI enabling systems to learn from data without being explicitly programmed.",
          image: "assets/imgs/imagecard1.png"
          },
          {
          title: "5G Networks",
          description: "The latest generation of mobile networks offering ultra-fast data speeds and low latency.",
          image: "assets/imgs/imagecard1.png"
          }
     ];

     const main = document.getElementsByTagName('main')[0];

     const SearchBar = document.createElement('div');

     SearchBar.className = "searchposts";



     SearchBar.innerHTML =`
     <div id='title'>
      <h4> Latest Posts </h4>
     
     </div>
     <div id='searchpart' style="width:100%; display:flex; justify-content: center;margin-top:2%;">

          <input type='text' placeholder='Search topics' id='searchtxt' style="width:80%;">
        
     </div>`; 
     



     SearchBar.style.display ="flex";
     SearchBar.style.flexDirection = "column";
     SearchBar.style.width ="100%";
     SearchBar.style.alignItems ="center";
     SearchBar.style.marginTop = "2%";

     main.appendChild(SearchBar);
     const postcontainer = document.createElement('div');
     postcontainer.className = "postcontainer";
     postcontainer.style.display = "flex";
     postcontainer.style.flexWrap ="wrap";
     postcontainer.style.alignContent = "start";
     postcontainer.style.paddingTop = "2%";
     SearchBar.appendChild(postcontainer);


     techTopics.forEach(topic =>{
          const card = document.createElement('div');
          card.className = "tech-topics";
          card.style.display="flex";
          // card.style.flexDirection = "column";
          card.style.flex = `0 0 calc(${100 / 3}% - 2%)`;
          card.style.justifyContent = "center";
          card.style.marginTop = "5%";
          card.innerHTML = `
          <div class="card">

               <img src="${topic.image}" class="card-img-top" alt="...">
               <div class="card-body" style="display: flex;flex-direction: column;/* gap: 20%; *//* padding-bottom: 2%; */width: 100%; ">
                    <h5 class="card-title" style=" width: 100%;">${topic.title}</h5>
                    <p class="card-text">
                         ${topic.description}
                    </p>
                                                  
               </div>
     
          </div>
          
          `;
          
          
          postcontainer.appendChild(card);
     });


     const searchInput = document.getElementById('searchtxt');
     searchInput.addEventListener('input', () => {

          const searchedTopic = document.getElementById('searchtxt').value.toLowerCase();
          const postTitle = document.querySelectorAll('.tech-topics');

          postTitle.forEach(card =>{

          const title = card.querySelector('.card-title').textContent.toLowerCase();
          
          if(title.includes(searchedTopic)){

               card.style.display = "flex";
          }
          else {
               card.style.display = "none";
          }

          });

     });

     

 const requestOptions = {
  method: "GET",  
  redirect: "follow"
     };

     fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
     .then((response) => response.json())
     .then(data => {
     const postBlog = document.createElement('div');
     postBlog.className = "postblog";

     data.slice(0,9).forEach(post =>{
     const postContainer = document.createElement('div');
     postContainer.className = "posts";
     postContainer.innerHTML = `
          <div class="post" style="width:100%";>
              
              
               <h2 id="posttitle" style="font-size:1.5em;">${post.title}</h2>
               <p id="postdescription" style=" text-wrap:wrap;"> ${post.body}</p>


          </div>
  

     
     
     
     `;
          postBlog.style.backgroundColor="#213BB0";
          postBlog.style.display="flex";
          postBlog.style.flexDirection="column";
          postBlog.style.marginTop="5%";
          postBlog.style.width="100%";
          postBlog.style.paddingTop="5%";
          postBlog.style.paddingLeft="5%";
          postBlog.style.color="white";
         
      postBlog.appendChild(postContainer);
     });
    
    postcontainer.appendChild(postBlog);
  })
  .catch((error) => console.error("cant display oops",error));

});
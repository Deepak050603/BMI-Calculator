
import { TextField } from '@mui/material'
import './App.css'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [bmi,setBmi]=useState("0")
  const [report,SetReport] = useState("")
  const [weight,setWeight] = useState("")
  const [height,setHeight] = useState("")
  const [isWeight,setisWeight]=useState(true)
  const [isHeight,setisHeight]=useState(true)
  const [color,setColor]=useState("text-dark")

  const Validate=(e)=>{


    if(!!e.target.value.match('^[0-9 .]*$')){
      if(e.target.name=='weight'){
        setWeight(e.target.value)
        setisWeight(true)

      }
     
      else{
        setHeight(e.target.value)
        setisHeight(true)
      }
    }
    else{
      if(e.target.name=='weight'){
        setWeight(e.target.value)
        setisWeight(false)

      }
     
      else{
        setHeight(e.target.value)
        setisHeight(false)
      }
    }
    
    
  }
  const handleReset =()=>{
    setBmi("0")
    SetReport("")
    setWeight("")
    setHeight("")
    setisWeight(true)
    setisHeight(true)
    
  }
  const handleCalculate=()=>{
   if(!weight || !height){
    toast.info("Fill the form completly")
   }
   else{
    const calcbmi=(Math.round((weight/(height/100)**2)*10))/10
    setBmi(` BMI = ${calcbmi}`)

    if(calcbmi<18.5){
      setColor("text-warning")
      SetReport('"Underweight"')
    }
    else if(calcbmi>=18.5 && calcbmi<=25){
      setColor("text-success")
      SetReport('"Healthyweight"')
    }
    else if(25<calcbmi && 30>=calcbmi ){
      setColor("text-warning")
    SetReport('"Overweight"')
  }
  else{
    setColor("text-danger")
    SetReport('"Obesity"')
  }
   }
}
 


  return (
    <>
      <div style={{height:'100vh'}} id='contain' className=' bg-light w-100 p-3  d-flex justify-content-center align-items-center '>
        <div style={{width:'500px'}} id='calc' className=' bg-success p-4 p-md-5  rounded'>
        <h1 className='text-light fs-1' >BMI Calculator</h1>
        <p className='text-light'>Know Your BMI Easily</p>
        <div  style={{height:'100%'}}className=' p-1 bg-light shadow border border-dark  text-dark rounded d-flex justify-content-center align-items-center flex-column'>
     <p className=' text-dark 'style={{fontSize:30}}><b>{bmi} </b></p>

     <h4 className={color}>{report}</h4>
    </div> 
      <div className='m'>
          <div  className="my-3 tf ">
    <TextField id="outlined-basic" value={weight} name='weight' label="weight "  color='light'  variant="outlined" className='w-100 ' onChange=
    {(e)=>{Validate(e)}}/>
    
    {!isWeight&& <span className='text-danger'>*invalid input</span>}
    </div>
      </div>
 <div className='m'>
    <div className="my-3 tp ">
    <TextField id="outlined-basic1" value={height} name='height' label="Height"  color='light' variant="outlined" className='w-100' onChange=
    {(e)=>{Validate(e)}}/>
    {!isHeight&& <span className='text-danger'>*invalid input</span>}
    </div>
 </div>
  <div className="mb-3 d-flex justify-content-between gap-2">
  <Button style={{width:'100%',height:'60px',}}  variant="contained" onClick={handleCalculate} disabled={isHeight && isWeight ? false:true}  >Calculate <FontAwesomeIcon className='ms-2' icon={faCalculator} /></Button>
  <Button  style={{width:'100%',height:'60px'}} id='btn'  variant="contained" onClick={handleReset}   >Reset <FontAwesomeIcon className='ms-2' icon={faRotateLeft} /></Button>
  </div>
      
    
        </div>
        
      </div>
      <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"

/>
    </>
  )
}

export default App

'use client'
import React, { useEffect, useState } from 'react'

const FormComponent = ({ formId }) => {
  const [cmsForm, setCmsForm] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData=new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData),"formData--")

 const dataToSend = Array.from(formData.entries()).map(([name, value]) => ({
  field: name,
  value: value.toString(),
}));
    const res=await fetch('api/form-submissions',{
        method:'POST',
        body:JSON.stringify({
            form:formId,
            submissionData:dataToSend
        }),
        headers:{
            'Content-Type':'application/json'
        }
    })
    if(res.ok){
        console.log("form is submitted")
    }
    else{
        console.log("form is not sunmitted")
    }

   
  }

  useEffect(() => {
    fetch(`api/forms/${formId}`)
      .then((res) => res.json())
      .then((data) => {
        setCmsForm(data)
        console.log(data, 'from api')
      })
      .catch((err) => setError(err.message))
   
  }, [formId])
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        {cmsForm &&
          cmsForm.fields.map((item) => (
            <div key={item.id}>
              <label htmlFor={item.id}>{item.label}</label>
              <input type={item.type} name={item.name} id={item.name}/>
            </div>
          ))}
        <button type="submit" >Submit</button>
      </form>
    </div>
  )
}

export default FormComponent

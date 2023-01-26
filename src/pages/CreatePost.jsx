import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
const CreatePost = ({darkMode}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  //Generating Images
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/dalle`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({prompt: form.prompt})
        })
        const data = await response.json();

        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      } finally{
        setGeneratingImg(false);
      }
    }else{
      alert("Please enter a prompt");
    }
  }

// Submit Function to create post in the database
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/post`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify(form)
        })
        await response.json();
        navigate('/');
      } catch (error) {
        alert(error);
      } finally{
        setLoading(false)
      }
    }else{
      alert("Please enter a prompt and generate an image")
    }
  }

// handle the onchnage input function
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // handle surprise me function to get the random propmt
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  }


  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className="font-extrabold text-[32px]" style={darkMode?{color:"rgb(227 227 227)"}:{color:"#222328"}}>Create</h1>
        <p className='mt-2 text-[16px] max-w[500px]' style={darkMode?{color:"rgb(227 227 227)"}:{color:"#666e75"}}>Creating imaginative and visually stunning images through Dall-E AI and share them with the community</p>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Abdullah Ansari"
            value={form.name}
            handleChange={handleChange}
            darkMode={darkMode}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            darkMode={darkMode}
          />
          {/* Image display */}
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img src={preview} alt="preview"
                className='w-9/12/12 object-contain opacity-40'
              />
            )}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
          {/* Image display End*/}
        </div>
        {/* Generate image Button */}
        <div className='mt-5 gap-5 flex '>
          <button
            type='button'
            disabled={generatingImg ?true:false}
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        {/* Generate image Button */}
        {/* ------------------------------------------- */}
        {/* Share Button */}
        <div className='mt-10'>
          <p className='mt-2 text-[14px]' style={darkMode?{color:"rgb(227 227 227)"}:{color:"#666e75"}}>Once you have created the image you want, you can share it with others in the community</p>
          <button
            type='submit'
            disabled={loading ?true:false}
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
         {/* Share Button End*/}
      </form>
      {/* Form End */}
    </section>
  )
}

export default CreatePost
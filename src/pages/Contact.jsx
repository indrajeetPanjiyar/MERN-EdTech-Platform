import React from 'react'
import ReviewSlider from '../components/core/HomePage/ReviewSlider';
import Footer from '../components/common/Footer';
import ContactDetails from '../components/ContactPage/ContactDetails';
import ContactForm from '../components/ContactPage/ContactForm';

const Contact = () => {
  return (
    <div>
        <div className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-evenly gap-10 text-white lg:flex-row'>
            <div className='lg:w-[40%]'>
                <ContactDetails />
            </div>

            <div className='lg:w-[40%]'>
                <ContactForm />
            </div>
        </div>

        <div className='relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
            <h1 className='text-center text-4xl font-semibold mt-8'>
                Review from other learners.
            </h1>
            <ReviewSlider />
        </div>

        <Footer />
    </div>
  )
}

export default Contact;
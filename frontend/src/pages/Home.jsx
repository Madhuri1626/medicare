// import React from 'react'
import heroImg01 from '../assets/images/hero-img01.png';
import heroImg02 from '../assets/images/hero-img02.png';
import heroImg03 from '../assets/images/hero-img03.png';
import About from '../components/About/About';
import DoctorsList from '../components/Doctors/DoctorsList';
import ServiceList from '../components/Services/ServiceList';




const Home = () => {
  return(
  <>
  
    {/* hero section */}

    <section className="hero__section pt-[60px] 2xl:h-[800px]">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
          {/* hero content */}
          <div>
            <div className="lg:w-[570px]">
              <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                We Help Patients live a Healthy, Longer Life

              </h1>
              <p className="text__para">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Vero accusantium laboriosam pariatur facilis,
                nostrum nesciunt qui adipisci obcaecati quo ea impedit,
                quaerat rerum magni explicabo et!
                Ullam delectus quas dolorum!
              </p>
              <button className="btn">
                Join Us
              </button>

            </div>
            {/* hero counter */}
            <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg-gap-[30px]">
              <div>
                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg-leading-[54px] font-[700] text-headingColor">
                  30+
                </h2>
                <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]">
                  <p className="text__para">
                    Years of Experience
                  </p>
                </span>
              </div>
              <div>
                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg-leading-[54px] font-[700] text-headingColor">
                  15+
                </h2>
                <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]">
                  <p className="text__para">
                    Clinic Location
                  </p>
                </span>
              </div>
              <div>
                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg-leading-[54px] font-[700] text-headingColor">
                  100%
                </h2>
                <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]">
                  <p className="text__para">
                    Patient Satisfactory
                  </p>
                </span>
              </div>
            </div>
          </div>
          {/* hero content */}
          <div className="flex gap-[30px] justify-end">
            <div>
              <img className="w-full" src={heroImg01} alt="" />
            </div>
            <div className="mt-[30px]">
              <img src={heroImg02} alt="" className="w-full mb-[30px]" />
              <img src={heroImg03} alt="" className="w-full" />
            </div>
          </div>

        </div>

      </div>

    </section>
    {/* hero section end*/}
    <About />
    {/* services section start */}

    <section>
      <div className="container">

        <div className="xl:w-[470px] mx-auto">
          <h2 className="heading text-center">Our Medical Services</h2>
          <p className="text__para text-center">world-class care for everyone. Our health system offers unmatched, expert health care.</p>

        </div>
        <ServiceList />
        </div>
    </section>
    {/* service section end */}
    {/* our great docs */}
    <section>
      <div className="container">

        <div className="xl:w-[470px] mx-auto">
          <h2 className="heading text-center">Our Great Doctors</h2>
          <p className="text__para text-center">world-class care for everyone. Our health system offers unmatched, expert health care.</p>

        </div>
        <DoctorsList />
        </div>
    </section>

</>
  )

}

export default Home

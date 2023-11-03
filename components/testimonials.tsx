import Image from 'next/image'

import TestimonialImage01 from '@/public/images/testimonial-01.jpg'
import TestimonialImage02 from '@/public/images/testimonial-02.jpg'
import TestimonialImage03 from '@/public/images/testimonial-03.jpg'
import ModalVideo from "./modal-video2";
import VideoThumb from '../public/thumbnail3.jpg'
import VideoThumb2 from "../public/zOqun8lfJnQAzVdM1698069017-2.jpg";


export default function Testimonials() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Don't take our word for it</h2>
            <p className="text-xl text-gray-400">
              Experience the Impact of a Fast and Reliable Internet Connection.
            </p>
          </div>

          <div className="flex xxxs:flex-col lg:flex-row  md:flex-row gap-5 justify-center items-center">
            <div>
              <ModalVideo
                thumb={VideoThumb}
                thumbWidth={304}
                thumbHeight={76}
                thumbAlt="Modal video thumbnail"
                video="/videos/Fiber.mp4"
                videoWidth={1920}
                videoHeight={1080}
              />
            </div>
            <div>
              <ModalVideo
                thumb={VideoThumb2}
                thumbWidth={304}
                thumbHeight={76}
                thumbAlt="Modal video thumbnail"
                video="/videos/fiber2.mp4"
                videoWidth={1920}
                videoHeight={1080}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

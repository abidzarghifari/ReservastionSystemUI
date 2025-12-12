import { Button } from "@/components/ui/button";
import BookingCard from "../components/bookingCard";

export default function Page(){
	return (
		<>
			<section className="md:min-h-2/3 lg:min-h-screen bg-amber-200">
				<div className="bg-card rounded-3xl h-full flex flex-col md:flex-row items-center justify-center  mx-auto overflow-hidden">
					
					<div className="w-full bg-amber-300 md:w-1/2 p-20 transition-all duration-500 ease-in-out peer-hover:md:w-1/3">
						<h2 className="text-base font-semibold text-rose-700">Unforgettable Stays</h2>
						<p className="mt-2 font-bold lg:text-3xl" id="carousel-title">Elegance in Every Room</p>
						<p className="w-full text-sm md:mt-3 lg:mt-6 lg:text-lg text-white" id="carousel-description">
							Discover a sanctuary of comfort and style. Each of our rooms is meticulously, we ensure every detail contributes to a memorable stay.
						</p>
						<div className="mt-5 flex gap-3 items-center">
							<h1 className="rounded-full p-3 px-4 bg-transparent border-gray-300 border-1 text-gray-200 hover:bg-rose-400 hover:border-transparent hover:text-black">Booking Now</h1><div className="bg-white rounded-full text-card"><BookingCard></BookingCard></div>
						</div>
						
					</div>

					<div className="w-full h-full md:w-1/2 p-4 bg-amber-100 relative peer transition-all duration-500 ease-in-out hover:md:w-2/3">
						<div className="relative overflow-hidden h-full rounded-3xl">
							<div id="image-carousel" className="flex h-full transition-transform duration-500 ease-in-out">
								
									<div className="w-full h-full flex-shrink-0">
										<img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop" alt="Gambar 1" className="w-full h-full object-cover" data-title="Elegance in Every Room" data-description="Discover a sanctuary of comfort and style. Each of our rooms is meticulously designed to provide an unparalleled experience of luxury and tranquility." />
									</div>
									<div className="w-full h-full flex-shrink-0">
										<img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop" alt="Gambar 2" className="w-full h-full object-cover" data-title="Modern Living Spaces" data-description="Our modern living spaces are crafted for the discerning traveler, blending functionality with sophisticated design for a truly relaxing stay." />
									</div>
									<div className="w-full h-full flex-shrink-0">
										<img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop" alt="Gambar 3" className="w-full h-full object-cover" data-title="Ultimate Comfort" data-description="From plush bedding to breathtaking views, we ensure every detail contributes to a memorable and comfortable stay." />
									</div>
								
							</div>
						</div>

						<div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 mt-4">
							<button className="w-3 h-3 bg-gray-400 rounded-full hover:bg-gray-700 transition-colors duration-300 dot-indicator active" data-slide="0"></button>
							<button className="w-3 h-3 bg-gray-400 rounded-full hover:bg-gray-700 transition-colors duration-300 dot-indicator" data-slide="1"></button>
							<button className="w-3 h-3 bg-gray-400 rounded-full hover:bg-gray-700 transition-colors duration-300 dot-indicator" data-slide="2"></button>
						</div>

						<button id="prev-slide" className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full ml-2 hover:bg-opacity-75 focus:outline-none">
							&#10094;
						</button>
						<button id="next-slide" className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full mr-2 hover:bg-opacity-75 focus:outline-none">
							&#10095;
						</button>
					</div>
				</div>
			</section>
		</>
	);
}
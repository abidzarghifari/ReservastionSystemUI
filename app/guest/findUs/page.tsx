import MapCard from "@/app/guest/components/mapCard";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Page(){
	return (
		<>
				<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:pt-5">
					<div className='hidden md:block  text-gray-200'>
						<h1 className="md:text-l lg:text-xl">(01)</h1>
						<h1 className="md:text-l lg:text-xl">Our Location</h1>
						<h1 className="md:text-xl lg:text-4xl"><strong>We</strong> Lorem, ipsum dolor sit amet <strong>reprehenderit.</strong> Lorem ipsum sit amet <strong>consectetur</strong> elit. </h1>
						<Accordion
						type="single"
						collapsible
						className="w-full mt-10"
						defaultValue="item-1"
						>
						<AccordionItem value="item-1">
							<AccordionTrigger>Product Information</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-4 text-balance">
							<p>
								Our flagship product combines cutting-edge technology with sleek
								design. Built with premium materials, it offers unparalleled
								performance and reliability.
							</p>
							<p>
								Key features include advanced processing capabilities, and an
								intuitive user interface designed for both beginners and experts.
							</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>Shipping Details</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-4 text-balance">
							<p>
								We offer worldwide shipping through trusted courier partners.
								Standard delivery takes 3-5 business days, while express shipping
								ensures delivery within 1-2 business days.
							</p>
							<p>
								All orders are carefully packaged and fully insured. Track your
								shipment in real-time through our dedicated tracking portal.
							</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger>Return Policy</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-4 text-balance">
							<p>
								We stand behind our products with a comprehensive 30-day return
								policy. If you&apos;re not completely satisfied, simply return the
								item in its original condition.
							</p>
							<p>
								Our hassle-free return process includes free return shipping and
								full refunds processed within 48 hours of receiving the returned
								item.
							</p>
							</AccordionContent>
						</AccordionItem>
						</Accordion>
					</div>
					
					<div className='md:hidden p-1'>
						<h1 className="text-2xl">Our best</h1>
						<h2 className='text-3xl font-bold'>Location</h2>
						<Accordion
						type="single"
						collapsible
						className="w-full mt-5"
						defaultValue="item-1"
						>
						<AccordionItem value="item-1">
							<AccordionTrigger>Product Information</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-4 text-balance">
							<p>
								Our flagship product combines cutting-edge technology with sleek
								design. Built with premium materials, it offers unparalleled
								performance and reliability.
							</p>
							<p>
								Key features include advanced processing capabilities, and an
								intuitive user interface designed for both beginners and experts.
							</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>Shipping Details</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-4 text-balance">
							<p>
								We offer worldwide shipping through trusted courier partners.
								Standard delivery takes 3-5 business days, while express shipping
								ensures delivery within 1-2 business days.
							</p>
							<p>
								All orders are carefully packaged and fully insured. Track your
								shipment in real-time through our dedicated tracking portal.
							</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger>Return Policy</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-4 text-balance">
							<p>
								We stand behind our products with a comprehensive 30-day return
								policy. If you&apos;re not completely satisfied, simply return the
								item in its original condition.
							</p>
							<p>
								Our hassle-free return process includes free return shipping and
								full refunds processed within 48 hours of receiving the returned
								item.
							</p>
							</AccordionContent>
						</AccordionItem>
						</Accordion>
					</div>
					<div className="lg:p-5">
						<MapCard/>	
					</div>
				</div>
		</>
	);
}


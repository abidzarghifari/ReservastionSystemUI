import MapCard from "@/app/guest/components/mapCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"

export default function Page(){
	return (
		<>
				<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:pt-5">
					<div className="text-gray-200">
						<div className="hidden md:block">
							<h1 className="md:text-lg lg:text-xl">(03)</h1>
							<h1 className="md:text-xl lg:text-4xl mb-2">Our <strong>Location.</strong></h1>
							<h1 className="md:text-lg max-w-4/5 leading-relaxed">Temukan kami dengan <strong>mudah</strong>, terletak <strong>strategis</strong> di pusat pariwisata Bukit Sikunir, kami siap melayani Anda.</h1>
						</div>
						<div className="md:hidden p-1">
							<h1 className="text-lg">(03)</h1>
							<h1 className="text-2xl">Our <strong>Location.</strong></h1>	
						</div>

						<Accordion
							type="single"
							collapsible
							className="w-full mt-10"
							defaultValue="item-1"
						>
						<AccordionItem value="item-1">
							<AccordionTrigger>Alamat</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-4 text-balance">
								<p>
									<strong className="text-rose-300">Azzahra Cabin House</strong><br />
									Gg. Pakuwojo, Sembungan,Kejajar,<br />
                        			Wonosobo, Jawa Tengah 56354
								</p>
							</AccordionContent>
						</AccordionItem>
						
						<AccordionItem value="item-2">
							<AccordionTrigger>Kontak</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-4 text-balance">
								<p>
									Jangan ragu untuk menyapa kami! <br/>
									WhatsApp: <strong>+62 812-1689-6812</strong> (Fast Response)<br/>
									Email: <strong>dikayoda450@gmail.com</strong>
								</p>
								<p>
									Kunjungi juga media sosial kami di @dika_yoda untuk update terbaru.
								</p>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-3">
							<AccordionTrigger>Panduan Menuju Lokasi</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-4 text-balance">
								<p>
								Kami berlokasi strategis di pusat pariwisata Bukit Sikunir Sembungan, hanya 15 menit dari area candi Dieng. 
								Jika Anda menggunakan navigasi GPS, kami berada di area villa Gg.Pakuwojo tepat disamping telaga cebong.
								</p>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-4">
							<AccordionTrigger>Informasi Parkir</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-4 text-balance">
								<p>
								Kami menyediakan area parkir yang luas dan aman untuk kendaraan roda empat 
								maupun roda dua. Akses masuk parkir terletak di sisi depan villa.
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


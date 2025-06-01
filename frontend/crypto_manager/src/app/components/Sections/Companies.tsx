/* eslint-disable @next/next/no-img-element */



const defaultCompanies = [
	{
		src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-1.svg",
		alt: "Arc",
	},
	{
		src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-2.svg",
		alt: "Descript",
	},
	{
		src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-3.svg",
		alt: "Mercury",
	},
	{
		src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-4.svg",
		alt: "Ramp",
	},
	{
		src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-5.svg",
		alt: "Retool",
	},
	{
		src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-6.svg",
		alt: "Watershed",
	},
];

export default function Companies() {
	return(
        <div className="py-8 px-24 relative bg-neutral-100 border-4 border-neutral-950">
          <p className="text-center text-violet-700 font-semibold">Our services earned the satisfaction of</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {defaultCompanies.map((company, idx) => (
              <div className="flex items-center gap-3" key={company.src + idx}>
                <img src={company.src} alt={company.alt} className="h-6 w-auto md:h-8" />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute -inset-0 backdrop-invert  border border-neutral-950"  />
        </div>

	)
}
import NavBar from './Navbar'

export function HomeownersApplication() {
    return (
        <div className="container mx-auto text-xl text-text.black">
            <div className="flex-col lg:flex mx-8">
                <NavBar currentPage="HomeownersApplication" />
                <h1 class="my-4 text-4xl text-rta.darkGreen font-bold tracking-tight text-center leading-none md:text-5xl lg:text-6xl uppercase">
                    Homeowners Application
                </h1>
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 flex flex-col mt-14 text-left text-3xl lg:mt-28">
                        <div className="space-y-3">
                            <div className="uppercase font-bold text-rta.darkGreen">Qualifications</div>
                            <div class="text-left text-xl list-disc ml-4">
                                <li>
                                    Live in Aurora
                                </li>
                                <li>
                                    Own and live in a single-family home
                                </li>
                                <li>
                                    Have current homeowner's insurance

                                </li>
                                <li>
                                    Meet the HUD low-income guidelines for the number of people in the household. This includes temporary or unrelated residents.
                                </li>
                            </div>

                        </div>
                    </div>
                    <div className="lg:w-1/2 flex flex-col justify-between pt-4 lg:pt-20 text-center text-5xl lg:mt-14">
                        <div className="flex flex-col justify-center mx-16 space-y-8">
                            <button
                                onClick={() => window.open('https://static1.squarespace.com/static/55e48a8ce4b0a8e051b2aea3/t/6465001c73a73773c9614397/1684340764798/Homeowner+App+-+rev.+May+2023.pdf', '_blank')}
                                className="border-2 border-black rounded-full bg-rta.green text-2xl p-2"
                            >
                                APPLICATION (ENGLISH)
                            </button>
                            <button
                                onClick={() => window.open('https://static1.squarespace.com/static/55e48a8ce4b0a8e051b2aea3/t/6465006a810be72f68f38375/1684340842912/Homeowner+App+-+SPANISH+rev.+May+2023.pdf', '_blank')}
                                className="border-2 border-black rounded-full bg-rta.green text-2xl p-2"
                            >
                                APLICACIÓN (ESPAÑOL)
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="m-8 space-y-3 text-xl">
                <h2 className="uppercase text-rta.darkGreen text-semibold text-3xl">Application Process</h2>
                <p>Rebuilding Together Aurora receives a significant number of applications every year. Applicants can expect a <span className="font-bold">2-12 month</span> waiting period, depending on time of application and repairs requested.</p>
                <div class="text-left list-disc ml-4">
                    <li>
                        <span className="font-bold">Step 1: Apply.</span> Submit your application with all required documents. A letter will be sent confirming receipt of your application in full.
                    </li>
                    <li>
                        <span className="font-bold">Step 2: Home Preview.</span> Once your application is received in full, a small crew (2-3 people) will be scheduled to visit your home. Their job is to review the items you applied for and create a comprehensive list of potential home repair projects in your home. This crew will take photos and talk with you about your needs. This visit usually takes an hour and will be scheduled approximately one week ahead of time. The preview team will compile a report with photos and recommendations for every home they visit and submit it back to RTA. This preliminary home preview allows our Board of Directors to select the projects within our means and volunteer ability.
                    </li>
                    <li>
                        <span className="font-bold">Step 3: Interview.</span> After preview of your home is complete, our staff will conduct a homeowner interview. This is a 15-minute conversation either on the phone or in person to get a better understanding of the requested repairs, to clarify any missing pieces of information from your application and to get a bit of background history to share with potential volunteer teams.

                    </li>
                    <li>
                        <span className="font-bold">Step 4: Project Selection</span>  RTA's Board of Directors meets regularly to review applications and select projects. A letter is sent to each applicant informing them of the decision. If your project is not selected, you are welcome to re-apply at any time.

                    </li>
                </div>

            </div>
        </div>

    )
}
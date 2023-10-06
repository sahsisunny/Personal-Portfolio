import React from 'react';

const Experience = () => {
	return (
		<div id="experience" className="w-full h-screen text-center">
			<div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
				<div>
					<p className="uppercase text-sm tracking-widest text-gray-600">
						EXPERIENCE
					</p>
					<h1 className="text-3xl font-bold text-gray-700 mb-8 w-full text-center">
						My Work Experience
					</h1>

					<div className="flex justify-center">
						<div className="max-w-lg w-full mb-10">
							<h2 className="text-lg font-medium mb-2">
								Open Source Contributor
							</h2>
							<h3 className="text-gray-500 text-sm mb-2">
								Real Dev Squad
							</h3>
							<h4 className="text-gray-500 text-sm mb-2">
								Dec 2022 - Present
							</h4>
							<ul className="list-disc list-inside text-gray-600  flex flex-col items-start">
								<li className="mb-2">
									Worked on different types of web frameworks like
									React, Next.js, Ember and Vue.js.
								</li>
								<li className="mb-2">
									Create the Goal form modal using Vue.js and Vuetify.
								</li>
								<li className="mb-2">
									Create the feature to lock the accoridon for
									unauthorized users.
								</li>
								<li className="mb-2">
									Add the filter feature to filter the users based on
									their status.
								</li>
								<li className="mb-2">
									Create the feature to show the uses pull requests on
									the profile page.
								</li>
							</ul>
						</div>
					</div>

					<div className="flex justify-center">
						<div className="max-w-lg w-full">
							<h2 className="text-lg font-medium mb-2">SMARTINTERNZ</h2>
							<h3 className="text-gray-500 text-sm mb-2">
								Android Developer(Externship)
							</h3>
							<h4 className="text-gray-500 text-sm mb-2">
								August 2022 - September 2022
							</h4>
							<ul className="list-disc list-inside text-gray-600 flex flex-col items-start ">
								<li className="mb-2">
									Worked with Kotlin in Android Development
								</li>
								<li className="mb-2">
									Designed graphics and UX using material design
								</li>
								<li className="mb-2">
									Understanding using of proper colors, spacing and
									fonts
								</li>
								<li className="mb-2">Created project ”Grocery App”</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Experience;

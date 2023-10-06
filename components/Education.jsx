import React from 'react';

const Education = () => {
	return (
		<div id="education" className="w-full h-screen text-center bg-gray-100">
			<div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
				<div>
					<p className="uppercase text-sm tracking-widest text-gray-600">
						Education
					</p>
					<h1 className="text-3xl font-bold text-gray-700 mb-8 w-full text-center">
						Where I Studied
					</h1>
					<div className=" m-auto">
						<div className="flex items-center mb-4">
							<p className=" text-right text-gray-600 pr-4 text-2xl font-bold">
								Degree:
							</p>
							<p className="text-left text-gray-700 text-2xl">
								Bachelor of Computer Applications (BCA)
							</p>
						</div>
						<div className="flex items-center mb-4">
							<p className="text-right text-gray-600 pr-4 text-2xl font-bold">
								University:
							</p>
							<p className="text-left text-gray-700 text-2xl">
								Patna University, Patna Bihar
							</p>
						</div>
						<div className="flex items-center mb-4">
							<p className="text-right text-gray-600 pr-4 text-2xl font-bold">
								Duration:
							</p>
							<p className="text-left text-gray-700 text-2xl">
								2019 - 2022
							</p>
						</div>
						<div className="flex items-center">
							<p className="text-right text-gray-600 pr-4 text-2xl font-bold">
								Grade:
							</p>
							<p className="text-left text-gray-700 text-2xl">
								8.36/10 (CGPA)
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Education;

"use client";

import { MdArrowBackIosNew } from "react-icons/md";
import UpdateTask from "@/components/summary/UpdateTask";
import Sidebar from "@/components/Sidebar";
import userStore from "@/stores/User";
import axiosBaseurl from '@/config/baseUrl';

const Summary = () => {
	const projectId = ""

	const getSummary = async () => {
		const response = await fetch(
			`http://localhost:8080/summary/${projectId}`, 
			{
					method: "GET",
					headers: { 
							"Content-Type": "application/json", 
					},
					body: JSON.stringify({}),
			} 
	);  
	const data = await response.json();
	}

	return (
		<div className="flex relative flex-row">
			<Sidebar />
			<div className="flex flex-row w-full">
				<div className="flex flex-col w-[100%]">
					<div className="flex w-full h-[50px] p-2 items-center text-lg font-semibold">
						Project name
					</div>
					<div className="w-full h-[50px] p-2">Sort By</div>
					<div className="flex w-full h-full px-2">
						<div className="relative w-full h-full bg-neutral-100 overflow-scroll snap-y">
							
							<div className="absolute grid grid-cols-7 h-screen w-full">
								<div className="flex justify-center w-full ">
									<div className="w-[3px]  bg-neutral-400 rounded-full"></div>
								</div>								
							</div>

							<div className="snap-center w-full h-[30%] grid grid-cols-7 items-center">
								<div className="flex justify-center items-center h-full w-full">
									<div className="w-[30px] h-[30px] bg-neutral-400 rounded-full"></div>									
								</div>
								<UpdateTask />
							</div>

							<div className="snap-center w-full h-[30%] grid grid-cols-7 items-center">
								<div className="flex justify-center items-center h-full w-full">
									<div className="w-[30px] h-[30px] bg-neutral-400 rounded-full"></div>									
								</div>
								<UpdateTask />
							</div>

							<div className="snap-center w-full h-[30%] grid grid-cols-7 items-center">
								<div className="flex justify-center items-center h-full w-full">
									<div className="w-[30px] h-[30px] bg-neutral-400 rounded-full"></div>									
								</div>
								<UpdateTask />
							</div>

							<div className="snap-center w-full h-[30%] grid grid-cols-7 items-center">
								<div className="flex justify-center items-center h-full w-full">
									<div className="w-[30px] h-[30px] bg-neutral-400 rounded-full"></div>									
								</div>
								<UpdateTask />
							</div>

						</div>
					</div>
				</div>
				<div className="w-[20%] bg-neutral-100">
					<div className="grid grid-cols-1 divide-y divide-teal-800">
						<div className="flex items-center text-lg font-semibold p-2">All Files</div>
						<div className="grid grid-flow-row auto-rows-max md:auto-rows-min">

							{/* map */}
							<div className="grid grid-cols-5 gap-1 h-[35px] px-2 flex items-center">
								<div className="truncate overflow-hidden col-span-3">Filename</div>
								<div>Date</div>
							</div>
					
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Summary;

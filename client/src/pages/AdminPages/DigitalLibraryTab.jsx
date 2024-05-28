import React from "react";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";

import BookImg from "../../assets/bookImage.jpg";

function DigitalLibraryTab() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h1 className="font-bold uppercase">Digital Library</h1>
				<div className="flex justify-end">
					<Button onClick={onOpen} color="secondary">
						Add Resourse
					</Button>
					<Modal size="xl" isOpen={isOpen} onClose={onClose} backdrop="blur">
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">
										Add Resource
									</ModalHeader>
									<ModalBody>
										<form action="">
											<Input
												type="text"
												label="Resource Name"
												color="primary"
												className="my-2"
											/>
											<Input
												type="text"
												label="Resource Link"
												color="primary"
												className="my-2"
											/>
											<input
												type="file"
												className="p-3 bg-primary-100 w-full rounded-md mb-2"
											/>
										</form>
									</ModalBody>
									<ModalFooter>
										<Button color="danger" variant="light" onPress={onClose}>
											Cancel
										</Button>
										<Button color="primary" onPress={onClose}>
											Add
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			</CardHeader>
			<Divider></Divider>
			<CardBody>
				<div className="grid grid-cols-5">
					<div className="m-2 bg-slate-200 px-2 py-1 rounded-md ">
						<img
							src={BookImg}
							alt=""
							className="w-[200px] h-[260px] rounded-md"
						/>
						<p className="text-center text-md">Resource Name</p>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

export default DigitalLibraryTab;

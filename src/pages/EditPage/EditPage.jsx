import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";

import ResumePreviewArea from "./ResumePreviewArea";
import ResumeFormArea from "./ResumeFormArea";
import ResumeTemplateArea from "./ResumeTemplateArea";
import NavbarArea from "./NavbarArea";
import { getResumeData } from "../../redux/slices/formDataSlice";
import { auth, db } from "../../utils/firebase/firebase";

// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import { db } from "../../index";
// import {
// 	collection,
// 	addDoc,
// 	query,
// 	orderBy,
// 	getDocs,
// 	deleteDoc,
// 	doc,
// 	serverTimestamp,
// } from "firebase/firestore";

const Root = styled.div`
	width: 100%;
	height: 100%;
`;

const Body = styled.div`
	display: flex;
`;

const templatesColorOrder = {
	London: [null],
	Sydney: ["#082A4D", "#581010", "#1D473A", "#32084D", "#1B212F"],
};

export default function EditPage() {
	const [isChoosingTemp, setIsChoosingTemp] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [tempColors, setTempColors] = useState([]);
	const { resumeId } = useParams();
	const dispatch = useDispatch();

	//傳送 resumeId 到 redux 獲取 resume data
	useEffect(() => {
		const user = auth.currentUser;
		console.log(user);
		if (user !== null) {
			const uid = user.uid;
			console.log(uid);
			const userRef = doc(db, "users", uid);
			const resumesRef = collection(userRef, "resumes");
			const resume = doc(resumesRef, resumeId);

			dispatch(getResumeData(uid, resumeId));
		}
	}, [resumeId]);

	const template = useSelector((state) => state.formData.template);
	useEffect(() => {
		setTempColors(templatesColorOrder[template]);
	}, [template]);

	let downloadPdfFunc = null;
	const handleGetDownLoadPdfFunc = (func) => {
		downloadPdfFunc = func;
	};

	const handleDownloadPdf = () => {
		if (isDownloading) return;
		if (downloadPdfFunc) {
			setIsDownloading(true);
			downloadPdfFunc();
		}
	};

	return (
		<Root>
			{isChoosingTemp && (
				<NavbarArea
					handleDownloadPdf={handleDownloadPdf}
					isDownloading={isDownloading}
					setIsChoosingTemp={setIsChoosingTemp}
					tempColors={tempColors}
				/>
			)}
			<Body isChoosingTemp={isChoosingTemp}>
				<ResumeFormArea isChoosingTemp={isChoosingTemp} />

				{isChoosingTemp && <ResumeTemplateArea />}
				<ResumePreviewArea
					choosingTempState={{ isChoosingTemp, setIsChoosingTemp }}
					handleGetDownLoadPdfFunc={handleGetDownLoadPdfFunc}
					handleDownloadPdf={handleDownloadPdf}
					isDownloadingState={{ isDownloading, setIsDownloading }}
				/>
			</Body>
		</Root>
	);
}

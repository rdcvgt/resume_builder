import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
	0% { opacity: 0; }
	100% { opacity: 1; }
`;

const rollingIn = keyframes`
	0% { opacity: 0; top:40%; }
	100% { opacity: 1; top:50%; }
`;

const CardBackground = styled.div`
	z-index: 10;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgb(0, 0, 0, 0.5);
	animation: ${fadeIn} 0.3s forwards;
`;

const Card = styled.div`
	z-index: 11;
	width: 500px;
	height: 350px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	border-radius: 10px;
	padding: 30px;
	animation: ${rollingIn} 0.4s forwards;
`;

const Title = styled.div`
	${(props) => props.theme.font.title};
	margin-bottom: 20px;
`;

const Description = styled.div`
	${(props) => props.theme.font.content};
	line-height: 1.5em;
`;

const CopyLinkArea = styled.div`
	margin: 30px 0px;
`;

const Subtitle = styled.div`
	${(props) => props.theme.input.title};
`;

const CopyLinkInput = styled.input`
	${(props) => props.theme.input.shortInput};
	margin-top: 10px;
	caret-color: ${(props) => props.theme.color.neutral[10]};
`;

const Buttons = styled.div`
	display: flex;
	justify-content: flex-end;
	position: absolute;
	right: 30px;
	bottom: 30px;
`;

const LeftButton = styled.div`
	${(props) => props.theme.font.blockTitle};
	width: 120px;
	height: 50px;
	background-color: #fff;
	color: ${(props) => props.theme.color.blue[50]};
	cursor: pointer;
	margin-right: 20px;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.3s;

	&:hover {
		transition: all 0.3s;
		color: ${(props) => props.theme.color.blue[70]};
	}
`;

const RightButton = styled.div`
	${(props) => props.theme.font.blockTitle};
	width: 120px;
	height: 50px;
	background-color: ${(props) => props.theme.color.blue[50]};
	color: #fff;
	cursor: pointer;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.3s;

	&:hover {
		transition: all 0.3s;
		background-color: ${(props) => props.theme.color.blue[60]};
	}
`;

const CloseIcon = styled.img`
	width: 15px;
	position: absolute;
	top: 30px;
	right: 30px;
	cursor: pointer;
	opacity: 0.5;
	transition: all 0.3s;

	&:hover {
		transition: all 0.3s;
		opacity: 1;
	}
`;

ShareLinkCard.propTypes = {
	shareResumeId: PropTypes.string,
	setShareResumeId: PropTypes.func,
	setIsClickShareLink: PropTypes.func,
};

export default function ShareLinkCard({
	shareResumeId,
	setShareResumeId,
	setIsClickShareLink,
}) {
	const copyLinkInputRef = useRef();
	const navigate = useNavigate();

	const handleInputClick = async () => {
		copyLinkInputRef.current.select();
	};

	const handleCopyLinkClick = async () => {
		copyLinkInputRef.current.select();
		await navigator.clipboard.writeText(copyLinkInputRef.current.value);
	};

	const handleOpenLinkClick = () => {
		navigate(`/share/${shareResumeId}`);
	};

	const handleCloseCardClick = () => {
		if (setShareResumeId) {
			setShareResumeId(null);
		}
		if (setIsClickShareLink) {
			setIsClickShareLink(false);
		}
	};

	return (
		<>
			<CardBackground onClick={handleCloseCardClick}></CardBackground>
			<Card>
				<Title>Share a Link to Your Resume</Title>
				<Description>
					Share this link on social media or copy and paste the URL to
					send your resume via text, email or to share your resume on
					your personal website.
				</Description>
				<CopyLinkArea>
					<Subtitle>Copy this private URL</Subtitle>
					<CopyLinkInput
						ref={copyLinkInputRef}
						onClick={handleInputClick}
						type="text"
						readonly="readonly"
						defaultValue={`https://resumesnap.web.app/share/${shareResumeId}`}></CopyLinkInput>
				</CopyLinkArea>
				<Buttons>
					<LeftButton onClick={handleOpenLinkClick}>
						Open Link
					</LeftButton>
					<RightButton onClick={handleCopyLinkClick}>
						Copy Link
					</RightButton>
				</Buttons>
				<CloseIcon
					src="/images/icon/cancel.png"
					onClick={handleCloseCardClick}
				/>
			</Card>
		</>
	);
}

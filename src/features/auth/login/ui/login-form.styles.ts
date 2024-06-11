import styled from "styled-components"

export const Wrapper = styled.form`
	display: flex;
	flex-direction: column;
	margin: 0px auto;
	width: 100%;
	max-width: 448px;
	background: white;
	border-radius: 4px;
	box-shadow:
		rgba(60, 66, 87, 0.12) 0px 7px 14px 0px,
		rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
	padding: 50px;

	.footer {
		display: flex;
		margin-top: 16px;
		gap: 10px;
	}
`

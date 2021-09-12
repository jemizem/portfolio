import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { media } from "../../styles/theme";

gsap.registerPlugin(ScrollTrigger);

const TextAnimation = () => {
    const startTrigger = useRef(null);

    const text1 = useRef(null);
    const text2 = useRef(null);
    const borderText1 = useRef(null);
    const borderText2 = useRef(null);

    useEffect(() => {
        const config = {
            scrollTrigger: {
                trigger: startTrigger.current,
                start: "top top",
								markers: true,
                toggleActions: "play play play play",
                scrub: 1,
            },
            x: 1500,
            duration: 1,
        };

        gsap.to(text1.current, config);
        gsap.to(borderText1.current, config);
        gsap.to(text2.current, {
            ...config,
            x: -1500,
        });
        gsap.to(borderText2.current, {
            ...config,
            x: -1500,
        })

    }, []);

		const [isShown, setIsShown] = useState(true);
		useEffect(() => {
			window.addEventListener("scroll", () => {
				if (innerHeight < pageYOffset) setIsShown(false);
				else setIsShown(true);
			});
		}, []);

    return (
        <>
					<Container ref={startTrigger} isShown={isShown}>
						<div className="text">
							<div className="text__content" ref={text1}>
								KIM JI MIN
							</div>
							<div className="text__content second" ref={text2}>
								FRONTEND
							</div>
						</div>
						<div
							style={{
								width: "100%",
								height: "100vh",
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							}}
						>
							<Circle />
						</div>
						<div className="text">
							<div className="text__content__border" ref={borderText1}>
								KIM JI MIN
							</div>
							<div className="text__content__border second" ref={borderText2}>
								FRONTEND
							</div>
						</div>
					</Container>
        </>
    );
};

const Container = styled.div<{ isShown: boolean }>`
  display: flex;
	align-items: center;
	width: 100%;
	height: 100vh;
	opacity: ${({ isShown }) => (isShown ? 1 : 0)};
	overflow: hidden;

	.text {
		position: absolute;
		top: 25vh;
		width: 100%;
		font-family: Montserrat;
		font-weight: 900;
		font-size: 10rem;
		line-height: 14.6rem;
		white-space: nowrap;

		&__content {
			color: blue;

			&__berfer {
				color: transparent;
				-webkit-text-stroke: 0.02em blue;
			}
		}

		${media.mobile} {
			white-space: pre-line;
			line-height: 10rem;
		}
	}

	.second {
		position: absolute;
		left: auto;
		right: 0;

		${media.mobile} {
			font-size: 6rem;
		}
	}
`;

const Circle = styled.div`
	position: relative;
	width: 35rem;
	height: 35rem;
	border-radius: 50%;
	background-color: yellow;
`;

export default TextAnimation;
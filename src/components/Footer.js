import React from "react";
import { Link } from "react-router-dom";
import style from "styled-components";

const Callout = style.h3`
    font-family: "Gill Sans Ultra",sans-serif;
    -webkit-text-fill-color: #FCFC0B;
    -webkit-text-stroke-color: #4499F6;
    -webkit-text-stroke-width: 0.70px;
    font-size: 18px;
    text-decoration: none;
    text-align: center;
    margin: 0 auto;

`;

const FooterContainer = style.footer`
    width: 60%;
    margin: 300px auto 0;
`;

const FooterLinks = style.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px 0;
`;

const FooterLink = style.a`
    font-family: "Gibson Bold";
    text-shadow: 0 20px 40px 0 rgba(0,0,0,.4);
    padding: 5px 20px;
    cursor: pointer;
    -webkit-text-fill-color: #410557;
    -webkit-text-stroke-color: #4499F6;
    -webkit-text-stroke-width: 0.70px;
    text-decoration: none;
    font-size: 22px;
    transition: all .25s ease-in-out;
    &:hover {
        -webkit-text-fill-color: #7DFA9B;
    }
`;

const Footer = (props) => {
  return (
    <>
      <FooterContainer>
        <Callout>
          Made by these incredibly attractive and intelligent individuals:
        </Callout>
        <FooterLinks>
          <FooterLink
            target="_blank"
            href="https://www.linkedin.com/in/jonathan-mendoza88/"
          >
            Jonathan Mendoza
          </FooterLink>
          <FooterLink
            target="_blank"
            href="https://www.linkedin.com/in/steven-elliott42/"
          >
            Steve Elliot
          </FooterLink>
          <FooterLink
            target="_blank"
            href="https://www.linkedin.com/in/courtney-jackson-609/"
          >
            Courtney Jackson
          </FooterLink>
          <FooterLink
            target="_blank"
            href="https://www.linkedin.com/in/jtwray/"
          >
            Tucker Wray
          </FooterLink>
          <FooterLink
            target="_blank"
            href="https://www.linkedin.com/in/jake-gifford-4516251a/"
          ></FooterLink>
          <FooterLink
            target="_blank"
            href="https://www.linkedin.com/in/jimmiqueparsons/"
          >
            Jimmique Parsons
          </FooterLink>
          <FooterLink
            target="_blank"
            href="https://www.linkedin.com/in/jamesharrisonhookerjr/"
          >
            Jimmy Hooker
          </FooterLink>
        </FooterLinks>
      </FooterContainer>
    </>
  );
};

export default Footer;

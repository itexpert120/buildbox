// this is where you can create a hackathon

// then you have people submit projects to the hackathon, but they create the project locally

const { normalize } = VM.require("buildbox.near/widget/utils.stringUtils") || {
  normalize: (s) => s,
};

const type = props.type || "project";
const app = props.app || "test";

const accountId = context.accountId;

const things = Social.keys(`*/${app}/${type}/**`, "final", {
  return_type: "BlockHeight",
});

if (!things) {
  return <p>No {type}s found.</p>;
}

/**
 * build box submit hackathon
 * or submit project to whatever hackathon is main
 */

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #292320;
  color: #fff;
  gap: 5rem;

  padding: 64px 80px;
`;

const Header = styled.h1`
  color: #fff;
  font-size: 90px;
  max-width: 900px;
  font-style: normal;
  text-align: left;
  font-weight: 500;
  line-height: 108px;
  text-transform: lowercase;

  @media screen and (max-width: 768px) {
    font-size: 36px;
    max-width: 70%;
    line-height: 43px;
  }
`;

const Subheader = styled.p`
  color: rgb(255, 255, 255);
  font-size: 24px;
  max-width: 800px;
  text-align: left;
  line-height: 36px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;

  @media screen and (max-width: 768px) {
    gap: 1rem;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
`;

const Subtext = styled.p`
  font-size: 12px;
  color: #c0c0c0;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  box-sizing: border-box;
  background-color: #292320;
  color: #fff;
  border: 1px solid #fff;
  outline: none;
  border-radius: 0.5rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  box-sizing: border-box;
  background-color: #292320;
  color: #fff;
  border: 1px solid #fff;
  outline: none;
  border-radius: 0.5rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxLabel = styled.label`
  margin-right: 15px;
  color: #fff;
`;

const CheckBox = styled.input`
  margin-right: 5px;
`;

const ConsentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ConsentCheckbox = styled.input`
  margin-right: 5px;
  margin-top: 5px;
`;

const ConsentLabel = styled.label`
  font-size: 14px;
`;

const SubmitButton = styled.button`
  color: #000;
  cursor: pointer;
  display: inline-block;
  font-size: 18px;
  box-shadow: 5px 6px 0 0 #000;
  font-style: normal;
  transition: 0.3s;
  font-weight: 500;
  border-color: #000;
  border-width: 1px;
  border-radius: 0;
  padding: 16px 24px;
  background-color: #ffcf77;

  &:hover {
    opacity: 0.5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [tracks, setTracks] = useState([]);
const [teammates, setTeammates] = useState("");
const [projectLink, setProjectLink] = useState("");
const [demoLink, setDemoLink] = useState("");
const [contactInfo, setContactInfo] = useState("");
const [consentChecked, setConsentChecked] = useState(false);
const [referrer, setReferrer] = useState("");
const [learning, setLearning] = useState("");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const [isEmailValid, setIsEmailValid] = useState(true);

function isValidEmail(email) {
  return emailRegex.test(email);
}

useEffect(() => {
  setIsEmailValid(isValidEmail(contactInfo));
  if (contactInfo === "") {
    setIsEmailValid(true);
  }
}, [contactInfo]);

const handleCheckboxChange = (track) => {
  if (tracks.includes(track)) {
    setTracks(tracks.filter((t) => t !== track));
  } else {
    setTracks([...tracks, track]);
  }
};

const handleSubmit = () => {
  if (contactInfo && consentChecked) {
    const { title, description, image, backgroundImage, category, tags } = v; // comes fr
    const id = normalize(title);
    const path = `${context.accountId}/${app}/${type}/${id}`;

    Social.set(
      {
        // post: {
        //   main: JSON.stringify({
        //     text: `I've just created a hackathon! #build #${app} #${type} \n\n[EMBED](buildbox.near/widget/embed?${type}=${path})\n\n`,
        //     image: "",
        //     type: "md",
        //     metadata: {},
        //   }),
        // },
        [app]: {
          [type]: {
            [id]: {
              "": JSON.stringify({
                // what data does a hackathon have?
              }),
              metadata: {
                name: title,
                description,
                image,
                backgroundImage,
                type: `every.near/type/${type}`, // for later
                category,
                tags,
              },
            },
          },
        },
      },
      {
        force: true,
        onCommit: (v) => console.log("onCommit", v),
        onCancel: (v) => console.log("onCancel", v),
      }
    );
  } else {
    // alert("Please provide your Personal Contact Info and consent to submit.");
  }
};

const pageDescription = `Congratulations for making it here! Please be sure to fill out all of the following fields in the suggested format so we can efficiently review them in the most efficient way.

To be eligible for the Abstraction Hacks prize, you must:

- Submit to only one team for General Prize. For Mintbase, Potluck you can submit multiple.
- Have a public GitHub repository with a readme.md file.
- Include a video to a demo in your readme.md file.
- If submitting a previous project, you must have made significant changes during the hackathon.
- Specify which bounties you are tackling

**Additional Details**

- Submit to only one team: You may not submit the same project to multiple teams.
- Public GitHub repository: Your GitHub repository must be public so that the judges can view your code.
- Readme.md file: Your readme.md file should include a description of your project, how to run it, and any other relevant information.
- Video to a demo: Your video demo should show your project in action.
- Significant changes: If submitting a previous project, you must have made significant changes during the hackathon and provide proof of what you changed during the hackathon. This could includes adding dates and timestamps of any code written before and after the hackathon (ie: adding new features, improving the performance of your code, or fixing bugs).`;

return (
  <Root>
    <HeaderContainer>
      <Header>📦 Abstraction Hacks Projects Submission</Header>
      <Subheader>
        <Markdown text={pageDescription} />
      </Subheader>
    </HeaderContainer>
    <FormContainer>
      <FormGroup>
        <Label htmlFor="title">
          Title<span className="text-danger">*</span>
        </Label>
        <Subtext>What do you want to call this project?</Subtext>
        <Input
          name="title"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="description">Description</Label>
        <Subtext>
          1-2 paragraphs explaining what did you build and what problem(s) does
          it solve?
        </Subtext>
        <Textarea
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>Tracks</Label>
        <Subtext>Check the tracks you are opting in for</Subtext>
        <CheckboxGroup>
          {[
            "General Prize",
            "Mintbase",
            "Keypom",
            "Abstraction on BOS",
            "Postlock Bounty",
            "NEAR Balkans",
            "Pagoda's Chain Signatures",
            "Metatransactions",
          ].map((track) => (
            <CheckboxLabel key={track}>
              <CheckBox
                type="checkbox"
                checked={tracks.includes(track)}
                onChange={() => handleCheckboxChange(track)}
              />
              {track}
            </CheckboxLabel>
          ))}
        </CheckboxGroup>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="teammates">Teammates</Label>
        <Subtext>@ the near addresses of your teammates</Subtext>
        <Input
          name="teammates"
          id="teammates"
          type="text"
          value={teammates}
          onChange={(e) => setTeammates(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="projectLink">
          Project's Public Github w/ Readme.md
        </Label>
        <Subtext>{/*Put a URL of your project*/}</Subtext>
        <Input
          name="projectLink"
          id="projectLink"
          type="text"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="demoLink">Demo Link</Label>
        <Subtext>Keep it under two minutes</Subtext>
        <Input
          id="demoLink"
          name="demoLink"
          type="text"
          value={demoLink}
          onChange={(e) => setDemoLink(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="contactInfo">
          Contact Email<span className="text-danger">*</span>
        </Label>
        <Subtext>
          This information will be on-chain and it is how we will communicate
          with you and distribute prizes
        </Subtext>
        <Input
          name="contactInfo"
          id="contactInfo"
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
        <span className="text-danger" style={{ fontSize: 12 }}>
          {!isEmailValid &&
            "Your Email is invalid. Please check it for mistakes."}
        </span>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="learning">What did you learn</Label>
        <Subtext></Subtext>
        <Textarea
          name="learning"
          id="learning"
          value={learning}
          onChange={(e) => setLearning(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="referrer">How did you hear about this hackathon?</Label>
        <Subtext>
          ie: Developer DAO, 100x Devs, BuildDAO, NEAR DevHub, etc...
        </Subtext>
        <Input
          name="referrer"
          id="referrer"
          type="text"
          value={referrer}
          onChange={(e) => setReferrer(e.target.value)}
        />
      </FormGroup>

      <ConsentContainer>
        <ConsentCheckbox
          type="checkbox"
          checked={consentChecked}
          onChange={() => setConsentChecked(!consentChecked)}
          name="consent"
          id="consent"
        />
        <ConsentLabel htmlFor="consent">
          By clicking here, you acknowledge that your responses above will be
          stored permanently on the blockchain and are accessible to anyone
          analyzing the social.near contract. Please ensure you are comfortable
          with this before proceeding.<span className="text-danger">*</span>
        </ConsentLabel>
      </ConsentContainer>
      <SubmitButton
        onClick={handleSubmit}
        disabled={!title || !contactInfo || !consentChecked || isEmailValid}
      >
        Submit
      </SubmitButton>
    </FormContainer>
  </Root>
);

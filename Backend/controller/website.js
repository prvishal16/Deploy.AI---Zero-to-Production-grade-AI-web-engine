//now i am here going to making the website that help very

import { generateResponse } from "../config/openRouter.js";
import UserDatabase from "../model/user.js";
import website from "../model/website.js";
import Extractjson from "../utils/extract.js";
import { nanoid } from "nanoid";

const masterPrompt = `
YOU ARE A PRINCIPAL FRONTEND ARCHITECT
AND A SENIOR UI/UX ENGINEER
SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS.

YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES
USING ONLY HTML, CSS, AND JAVASCRIPT
THAT WORK PERFECTLY ON ALL SCREEN SIZES.

THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.

❌ NO FRAMEWORKS
❌ NO LIBRARIES
❌ NO BASIC SITES
❌ NO PLACEHOLDERS
❌ NO NON-RESPONSIVE LAYOUTS

--------------------------------------------------
USER REQUIREMENT:
{USER_PROMPT}
--------------------------------------------------

GLOBAL QUALITY BAR (NON-NEGOTIABLE)
--------------------------------------------------
- Premium, modern UI (2026–2027)
- Professional typography & spacing
- Clean visual hierarchy
- Business-ready content (NO lorem ipsum)
- Smooth transitions & hover effects
- SPA-style multi-page experience
- Production-ready, readable code

--------------------------------------------------
RESPONSIVE DESIGN (ABSOLUTE REQUIREMENT)
--------------------------------------------------
THIS WEBSITE MUST BE FULLY RESPONSIVE.

YOU MUST IMPLEMENT:

✔ Mobile-first CSS approach
✔ Responsive layout for:
  - Mobile (<768px)
  - Tablet (768px–1024px)
  - Desktop (>1024px)

✔ Use:
  - CSS Grid / Flexbox
  - Relative units (%, rem, vw)
  - Media queries

✔ REQUIRED RESPONSIVE BEHAVIOR:
  - Navbar collapses / stacks on mobile
  - Sections stack vertically on mobile
  - Multi-column layouts become single-column on small screens
  - Images scale proportionally
  - Text remains readable on all devices
  - No horizontal scrolling on mobile
  - Touch-friendly buttons on mobile

IF THE WEBSITE IS NOT RESPONSIVE → RESPONSE IS INVALID.

--------------------------------------------------
IMAGES (MANDATORY & RESPONSIVE)
--------------------------------------------------
- Use high-quality images ONLY from:
  https://images.unsplash.com/
- EVERY image URL MUST include:
  ?auto=format&fit=crop&w=1200&q=80

- Images must:
  - Be responsive (max-width: 100%)
  - Resize correctly on mobile
  - Never overflow containers

--------------------------------------------------
TECHNICAL RULES (VERY IMPORTANT)
--------------------------------------------------
- Output ONE single HTML file
- Exactly ONE <style> tag
- Exactly ONE <script> tag
- NO external CSS / JS / fonts
- Use system fonts only
- iframe srcdoc compatible
- SPA-style navigation using JavaScript
- No page reloads
- No dead UI
- No broken buttons
--------------------------------------------------
SPA VISIBILITY RULE (MANDATORY)
--------------------------------------------------
- Pages MUST NOT be hidden permanently
- If .page { display: none } is used,
  then .page.active { display: block } is REQUIRED
- At least ONE page MUST be visible on initial load
- Hiding all content is INVALID


--------------------------------------------------
REQUIRED SPA PAGES
--------------------------------------------------
- Home
- About
- Services / Features
- Contact

--------------------------------------------------
FUNCTIONAL REQUIREMENTS
--------------------------------------------------
- Navigation must switch pages using JS
- Active nav state must update
- Forms must have JS validation
- Buttons must show hover + active states
- Smooth section/page transitions

--------------------------------------------------
FINAL SELF-CHECK (MANDATORY)
--------------------------------------------------
BEFORE RESPONDING, ENSURE:

1. Layout works on mobile, tablet, desktop
2. No horizontal scroll on mobile
3. All images are responsive
4. All sections adapt properly
5. Media queries are present and used
6. Navigation works on all screen sizes
7. At least ONE page is visible without user interaction

IF ANY CHECK FAILS → RESPONSE IS INVALID

--------------------------------------------------
OUTPUT FORMAT (RAW JSON ONLY)
--------------------------------------------------
{
  "message": "Short professional confirmation sentence",
  "code": "<FULL VALID HTML DOCUMENT>"
}

--------------------------------------------------
ABSOLUTE RULES
--------------------------------------------------
- RETURN RAW JSON ONLY
- NO markdown
- NO explanations
- NO extra text
- FORMAT MUST MATCH EXACTLY
- IF FORMAT IS BROKEN → RESPONSE IS INVALID
`;

export const GenerateData = async (req, res) => {
  try {
    //thiere i am going to tecking the promp t
    const { prompt } = req.body;
    if (!prompt) {
      return res
        .status(400)
        .json({ message: "prompt required for generating Any thing" });
    }

    const user = await UserDatabase.findById(req.user._id);
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "plz login for response generation" });
    }

    if (user.credit < 50) {
      return res
        .status(400)
        .json({ message: "You Don't Have Enough Credit For Generate Website" });
    }
    //here i am putin my prompt with master prommpt
    const finalprompt = masterPrompt.replace("{USER_PROMPT}", prompt);
    let row = "";
    let parsed = null;
    for (let i = 0; i < 2 && !parsed; i++) {
      row = await generateResponse(finalprompt);
      parsed = await Extractjson(row);
      if (!parsed) {
        row = await generateResponse(
          finalprompt + "\n\n RETURN ONLY ROW JSON.",
        );
        parsed = await Extractjson(row);
      }
      console.log(row);
    }

    if (!parsed.code) {
      console.log("Ai return invalid response ", row);
      return res.status(400).json({ message: "Ai return invalid data " });
    }

    const finalwebsite = await website.create({
      user: user._id,
      title: prompt.slice(0, 60),
      latestcode: parsed.code,
      slug: nanoid(10),
      converasation: [
        {
          role: "ai",
          content: parsed.message,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const updatedUser = await UserDatabase.findByIdAndUpdate(
      user._id,
      { $inc: { credit: -50 } },
      { returnDocument: "after" },
    );

    return res.status(201).json({
      websiteId: finalwebsite._id,
      remainingCredit: updatedUser.credit,
    });

    //now here i am going to wrting thhe code for the new prompt
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error from the Generate data", kabhail: error });
  }
};

//in the editor section i need website that is going to be edit soo edito section or  the specific website i need to require

export const GetWebsiteById = async (req, res) => {
  try {
    //this si the way i am finding
    const singlewebsite = await website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!singlewebsite) {
      return res
        .status(400)
        .json({ message: "Website Is Not Found", success: false });
    }

    return res.status(200).json(singlewebsite);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error from generate Website ", kabhail: error });
  }
};

//now i am going to tecking the data from backendto frontend

export const changewebsite = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res
        .status(400)
        .json({ message: "prompt required for generating Any thing" });
    }

    const singlewebsite = await website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!singlewebsite) {
      return res
        .status(400)
        .json({ message: "Website Is Not Found", success: false });
    }

    const user = await UserDatabase.findById(req.user._id);
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "plz login for response generation" });
    }

    if (user.credit < 25) {
      return res
        .status(400)
        .json({ message: "You Don't Have Enough Credit For Generate Website" });
    }

    const updateprompt = `
YOU ARE A SENIOR FRONTEND ENGINEER.

MODIFY THE EXISTING WEBSITE BASED ON USER REQUEST.

IMPORTANT:
- KEEP ALL EXISTING FEATURES
- ONLY APPLY THE REQUESTED CHANGE
- RETURN FULL UPDATED HTML FILE

CURRENT HTML:
${singlewebsite.latestcode}

USER REQUEST:
${prompt}

RETURN RAW JSON ONLY:
{
 "message":"Short confirmation",
 "code":"<FULL UPDATED HTML>"
}
`;

    let row = "";
    let parsed = null;
    for (let i = 0; i < 2 && !parsed; i++) {
      row = await generateResponse(updateprompt);
      parsed = await Extractjson(row);
      if (!parsed) {
        row = await generateResponse(
          updateprompt + "\n\n RETURN ONLY ROW JSON.",
        );
        parsed = await Extractjson(row);
      }
      console.log(row);
    }

    if (!parsed || !parsed.code) {
      console.log("Ai return invalid response ", row);
      return res.status(400).json({ message: "Ai return invalid data " });
    }

    singlewebsite.converasation.push(
      { role: "user", content: prompt },
      { role: "ai", content: parsed.message },
    );
    singlewebsite.latestcode = parsed.code;
    await singlewebsite.save();

    const updatedUser = await UserDatabase.findByIdAndUpdate(
      user._id,
      { $inc: { credit: -25 } },
      { returnDocument: "after" },
    );

    return res.status(201).json({
      message: parsed.message,
      code: parsed.code,
      remainingCredit: updatedUser.credit,
    });
    //now abb aagail prompt and user bhi milgail then lets see
  } catch (error) {
    return res
      .status(500)
      .json({ message: "update website errror", kabhail: error });
  }
};

export const getingallwebsite = async (req, res) => {
  try {
    //here i am going to
    const allwebsite = await website.find({ user: req.user._id });
    return res.status(200).json(allwebsite);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Getting all  website errror", kabhail: error });
  }
};

export const deploywebsite = async (req, res) => {
  try {
    //here i am going to teckin
    const singlewebsite = await website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!singlewebsite) {
      return res
        .status(400)
        .json({ message: "Website Is Not Found", success: false });
    }

    if (!singlewebsite.slug) {
      singlewebsite.slug =
        singlewebsite.title
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")
          .slice(0, 60) + singlewebsite._id.toString().slice(-5);
    }

    singlewebsite.deployed = true;
    singlewebsite.deployUrl = `${process.env.FRONTEND_URL}/site/${singlewebsite.slug}`;
    await singlewebsite.save();

    return res.status(200).json({ url: singlewebsite.deployUrl });
  } catch (error) {
    return res.status(500).json({ message: "Error fromt the deplywebsite " });
  }
};

export const getbyslug = async (req, res) => {
  try {
    ///

    const singlewebsite = await website.findOne({
      slug: req.params.slug,
      user: req.user._id,
    });

    if (!singlewebsite) {
      return res
        .status(400)
        .json({ message: "Website Is Not Found", success: false });
    }

    return res.status(200).json(singlewebsite);
  } catch (error) {
    return res.status(500).json({ message: "error from the singlewebsite" });
  }
};

//now i am going to working the backend site real project

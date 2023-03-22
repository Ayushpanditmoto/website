import Navbar from "@/components/Navbar";
import Head from "next/head";
import servers from "../data/servers.json";
import {
  DiscordMessages,
  DiscordMessage,
  DiscordMention,
  DiscordEmbed,
  DiscordEmbedDescription,
  DiscordEmbedFooter,
  DiscordEmbedFields,
  DiscordEmbedField,
  DiscordCommand,
  DiscordReaction,
  DiscordReactions,
  DiscordReply,
  DiscordCustomEmoji,
  DiscordAttachments,
  DiscordActionRow,
  DiscordButton,
} from "@skyra/discord-components-react";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { withIronSessionSsr } from "iron-session/next";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (user === undefined || user === '' || user === null) {
      return {
        props: {
          sessionKey: '',
        },
      };
    }

    return {
      props: {
        sessionKey: req.session.user,
      },
    };
  },
  {
    cookieName: "wouldyou_user",
    password:
      "wouldyouweb-v3-03-2023-production-marcdev-12398649187956916593619589153-9054832097540723572537",
    // secure: process.env.NODE_PUBLIC_MODE === 'DEVELOPMENT' ? false : true,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  }
);

interface HomeProps {
  sessionKey: string;
}

export default function Home({ sessionKey }: HomeProps) {
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleString());
  const [replayedRounds, setReplayedRounds] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const profiles = {
    wouldyou: {
      author: "Would You",
      avatar:
        "https://cdn.discordapp.com/avatars/981649513427111957/af5f8264403034530bba73ba6c2492d9.webp?size=96",
      roleColor: "#1e88e5",
      bot: true,
      verified: true,
    },
    sky: {
      author: "ForGetFulSkyBro",
      avatar:
        "https://cdn.discordapp.com/avatars/268843733317976066/a_8bd7baad840e8d0b54e7bb90bc91fab2.webp?size=80",
      roleColor: "#f1c40f",
      bot: false,
      verified: false,
    },
    dominik: {
      author: "Dominik",
      avatar:
        "https://cdn.discordapp.com/avatars/347077478726238228/3b77f755fa8e66fd75d1e2d3fb8b1611.webp?size=60",
      roleColor: "#F47FFF",
      bot: false,
      verified: false,
    },
    marc: {
      author: "MarcDev",
      avatar:
        "https://cdn.discordapp.com/avatars/799319682862809169/b3b2a0adea2900dc6c82962dca366b16.webp?size=80",
      roleColor: "#346beb",
      bot: false,
      verified: false,
    },
  };

  const questions = [
    "You can say “fuck this shit” and you automatically don’t have to do it anymore",
    "You have an irl minecraft inventory, no weight limit, 64 per stack.",
    "You can make anything have the opposite effect of what was supposed to be",
    `Everytime you see something and say 'Dang, that's too
    expensive.' a random person buys it and gives it to you`,
    "Each time someone compliments you a turtle will appear and give you a sandwich",
    "You are invisible to all doors, faucets, soaps, paper towels and hand dryer sensors.",
    "You can spawn any soda at will, but it will always be flat",
    "Any time you don’t understand something time freezes and David Attenborough explains how the thing works",
    "You can eat infinite food without getting fat",
  ];

  useEffect(() => {
    setCurrentQuestion(getRandomQuestion());
  }, []);

  function getRandomQuestion() {
    const index = Math.round(Math.random() * (questions.length - 1));
    return questions[index];
  }

  function replay() {
    if (replayedRounds < 3) {
      setCurrentQuestion(getRandomQuestion());
      setReplayedRounds(replayedRounds + 1);
    }
  }

  return (
    <>
      <Head>
        <title>Would You</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.png" />
      </Head>

      <Navbar sessionKey={sessionKey} />

      <main className="homepage-main">
        <section className="landing">
          <motion.div
            className="left"
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <h1>
              Entertain Your <span className="red">Discord</span>{" "}
              <span className="blue">Server</span>
            </h1>
            <p>
              Elevate your server&apos;s engagement with Would You, featuring
              user voting, daily messages, and customizability.
            </p>
            <Link href="/invite" target="_blank">
              <button className="wy-button primary">Invite</button>
            </Link>
          </motion.div>
          <motion.div
            className="right"
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <div className="interactive-mockup">
              <DiscordMessages class="rounded-lg shadow">
                <DiscordMessage
                  profile="wouldyou"
                  author={profiles.wouldyou.author}
                  avatar={profiles.wouldyou.avatar}
                  roleColor={profiles.wouldyou.roleColor}
                  bot={profiles.wouldyou.bot}
                  verified={profiles.wouldyou.verified}
                  edited
                >
                  <DiscordCommand
                    slot="reply"
                    profile="dominik"
                    author={profiles.dominik.author}
                    avatar={profiles.dominik.avatar}
                    roleColor={profiles.dominik.roleColor}
                    command="/custom useful"
                  ></DiscordCommand>
                  <DiscordEmbed slot="embeds" color="#1e88e5">
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="">
                        <p className="discord-field-title">
                          Would you want this power?
                        </p>
                        <p className="discord-embed-field">{currentQuestion}</p>
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFooter
                      timestamp={currentDate}
                      slot="footer"
                      footerImage="https://cdn.discordapp.com/attachments/1004008495483457546/1056748109700538429/Logo.png"
                    >
                      Would You
                    </DiscordEmbedFooter>
                  </DiscordEmbed>
                  <DiscordReactions slot="reactions">
                    <DiscordReaction name="✅" emoji="/check.svg" count={4}>
                      {" "}
                    </DiscordReaction>
                    <DiscordReaction
                      name="❌"
                      emoji="/x.svg"
                      count={1}
                    ></DiscordReaction>
                  </DiscordReactions>
                  <DiscordAttachments slot="components">
                    <DiscordActionRow>
                      {replayedRounds < 3 ? (
                        <DiscordButton type="primary" onClick={() => replay()}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 36 36"
                            width="36"
                            height="36"
                          >
                            <path
                              fill="#FFF"
                              d="M22.242 22.242l2.829 2.829c-3.905 3.905-10.237 3.904-14.143-.001-2.247-2.246-3.194-5.296-2.854-8.225l-4.037.367c-.215 3.84 1.128 7.752 4.062 10.687 5.467 5.467 14.333 5.468 19.799 0l2.828 2.828.849-9.334-9.333.849zM27.899 8.1C22.431 2.633 13.568 2.633 8.1 8.1L5.272 5.272l-.849 9.334 9.334-.849-2.829-2.829c3.906-3.905 10.236-3.905 14.142 0 2.248 2.247 3.194 5.297 2.856 8.226l4.036-.366c.216-3.841-1.128-7.753-4.063-10.688z"
                            />
                          </svg>
                          Replay
                        </DiscordButton>
                      ) : (
                        <DiscordButton
                          onClick={() =>
                            window.open(
                              "https://wouldyoubot.gg/invite",
                              "_blank"
                            )
                          }
                        >
                          <svg
                            aria-hidden="true"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M10 5V3H5.375A2.377 2.377 0 0 0 3 5.375v13.25A2.377 2.377 0 0 0 5.375 21h13.25A2.376 2.376 0 0 0 21 18.625V14h-2v5H5V5h5Z"
                            />
                            <path
                              fill="currentColor"
                              d="M21 2.999h-7v2h3.586l-8.293 8.293 1.414 1.414L19 6.413v3.586h2v-7Z"
                            />
                          </svg>
                          Invite Would You
                        </DiscordButton>
                      )}
                    </DiscordActionRow>
                  </DiscordAttachments>
                </DiscordMessage>
              </DiscordMessages>
            </div>
          </motion.div>
        </section>

        <motion.section
          className="servers"
          initial={{ opacity: 0, transform: "translateY(25px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        >
          <img src="/LandingWave.svg" alt="Wave" draggable={false} />
          <div className="servers-wrapper">
            <h2>Top Servers Using Would You</h2>
            <h3>
              Trusted by <span>2500</span> of your favorite communities on
              discord
            </h3>

            <div className="server-slider-up"></div>
            <div className="server-slider-wrapper">
              <div className="servers-slider-container-shade left"></div>
              <div className="servers-slider-container-shade right"></div>

              <motion.div
                className="servers-slider-container"
                initial={{ transform: "translateX(0)" }}
                animate={{ transform: "translateX(-7000px)" }}
                transition={{ duration: 80, repeat: Infinity }}
              >
                {servers.map((s: any) => (
                  <div className="servers-slider-item" key={s.name}>
                    <img
                      src={`/logos/${s.avatar}`}
                      alt={s.name}
                      draggable={false}
                    />
                    <div className="servers-slider-item-right">
                      <div className="servers-slider-item-right-head">
                        <h4 title={s.name}>{s.name}</h4>
                        {s.verified && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="60"
                            height="61"
                            fill="none"
                            viewBox="0 0 60 61"
                          >
                            <path
                              fill="#3BA55C"
                              fill-rule="evenodd"
                              d="M60 30.555c0 2.959-4.8 5.169-5.7 7.828-.9 2.659 1.65 7.49 0 9.7-1.65 2.21-6.9 1.311-9.225 2.997-2.325 1.685-2.963 6.892-5.775 7.828-2.813.936-6.262-2.997-9.262-2.997-3 0-6.563 3.746-9.263 2.997-2.7-.75-3.45-6.143-5.775-7.828-2.325-1.686-7.5-.674-9.225-2.996-1.725-2.323.862-6.892 0-9.701C4.912 35.573 0 33.513 0 30.555c0-2.96 4.8-5.169 5.7-7.828.9-2.66-1.65-7.491 0-9.701 1.65-2.21 6.937-1.31 9.3-2.996 2.363-1.686 2.925-6.892 5.738-7.94C23.55 1.04 27 5.197 30 5.197c3 0 6.563-3.745 9.263-2.996 2.7.749 3.412 6.142 5.737 7.828 2.325 1.685 7.5.674 9.225 2.996 1.725 2.322-.863 6.892 0 9.7.862 2.81 5.775 4.87 5.775 7.829Z"
                              clip-rule="evenodd"
                            />
                            <path
                              fill="#fff"
                              d="m28.319 44.272-12.656-9.57 3.722-5.105 7.445 5.742 13.55-17.978 5.062 3.753-17.123 23.158Z"
                            />
                          </svg>
                        )}
                        {s.partnered && !s.verified && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="60"
                            height="61"
                            fill="none"
                            viewBox="0 0 60 61"
                          >
                            <path
                              fill="#5865F2"
                              fill-rule="evenodd"
                              d="M59.987 30.112c0 2.959-4.799 5.168-5.698 7.827-.9 2.658 1.65 7.489 0 9.698-1.65 2.21-6.899 1.311-9.223 2.996-2.325 1.685-2.962 6.89-5.774 7.826-2.812.937-6.261-2.995-9.26-2.995-3 0-6.562 3.745-9.261 2.995-2.7-.748-3.45-6.14-5.774-7.826-2.325-1.685-7.499-.674-9.223-2.996-1.725-2.321.862-6.89 0-9.698C4.91 35.13 0 33.07 0 30.112s4.799-5.167 5.699-7.826c.9-2.659-1.65-7.49 0-9.699 1.65-2.21 6.936-1.31 9.298-2.996 2.362-1.685 2.924-6.89 5.736-7.938 2.812-1.049 6.261 3.108 9.26 3.108 3 0 6.562-3.745 9.261-2.996 2.7.749 3.412 6.141 5.737 7.826 2.324 1.686 7.498.675 9.223 2.996 1.724 2.322-.863 6.89 0 9.699.862 2.808 5.773 4.868 5.773 7.826Z"
                              clip-rule="evenodd"
                            />
                            <path
                              fill="#fff"
                              d="M49.843 29.937c0 1.494-.74 2.989-1.85 3.736L36.52 41.145c-2.22 1.494-4.441 2.241-7.032 2.241-1.11 0-1.85 0-2.96-.373-2.96-.747-5.18-2.242-7.031-4.483-.37-.748 0-1.495.37-1.868l5.18-3.363c.37-.373 1.111-.373 1.481 0 .74.374 1.48.747 1.85 1.12 1.48 0 2.59 0 3.7-.746l2.591-1.495 7.401-5.23 1.11-.747c1.85-1.121 4.811-.747 5.922 1.12.74 1.121.74 1.868.74 2.616Zm-9.236-6.78L35.39 26.54c-.746.375-1.119.375-1.864 0-.373-.376-1.118-.752-1.491-1.128-1.491-.376-2.61 0-3.728.752l-1.864 1.127-9.319 6.39c-2.237 1.127-4.846.751-5.964-1.504-1.491-1.88-.746-4.51 1.118-6.013l11.183-7.517c2.982-1.879 6.71-2.63 10.065-1.879 2.982.752 5.218 2.255 7.082 4.51.746.752.373 1.503 0 1.88Z"
                            />
                          </svg>
                        )}
                      </div>
                      <p>{s.members} Members</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="server-slider-down"></div>
          </div>
        </motion.section>

        <section className="features">
          <motion.div
            className="features-head"
            initial={{ opacity: 0, transform: "translateY(15px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <h2>Features</h2>
            <h3>What Does Would You Offer To Your Server?</h3>
          </motion.div>

          <div className="feature">
            <motion.div
              className="feature-mockup left"
              initial={{ opacity: 0, transform: "translateX(-50px)" }}
              whileInView={{ opacity: 1, transform: "translateX(0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
            >
              <DiscordMessages class="rounded-lg shadow">
                <DiscordMessage
                  profile="wouldyou"
                  author={profiles.wouldyou.author}
                  avatar={profiles.wouldyou.avatar}
                  roleColor={profiles.wouldyou.roleColor}
                  bot={profiles.wouldyou.bot}
                  verified={profiles.wouldyou.verified}
                >
                  <DiscordMention type="role" color="#3489c3">
                    QOTD
                  </DiscordMention>
                  <DiscordEmbed slot="embeds" color="#1e88e5">
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="Would you want this power?">
                        You get 3% smarter every time someone calls you stupid.
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFooter
                      timestamp={currentDate}
                      slot="footer"
                      footerImage="https://cdn.discordapp.com/attachments/1004008495483457546/1056748109700538429/Logo.png"
                    >
                      {" "}
                      Would You{" "}
                    </DiscordEmbedFooter>
                  </DiscordEmbed>
                </DiscordMessage>
              </DiscordMessages>
            </motion.div>
            <motion.div
              className="feature-info right"
              initial={{ opacity: 0, transform: "translateX(50px)" }}
              whileInView={{ opacity: 1, transform: "translateX(0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
            >
              <h4>Increase user engagement</h4>
              <p>
                A Daily Would You rather messages allow you to keep your users
                engaged and active in your community.
              </p>
            </motion.div>
          </div>

          <div className="feature">
            <motion.div
              className="feature-info left"
              initial={{ opacity: 0, transform: "translateX(-50px)" }}
              whileInView={{ opacity: 1, transform: "translateX(0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
            >
              <h4>Keep the server active</h4>
              <p>
                We provide your server with hundreds of funny possible
                superpowers ready to start a conversation with.
              </p>
            </motion.div>
            <motion.div
              className="feature-mockup right"
              initial={{ opacity: 0, transform: "translateX(50px)" }}
              whileInView={{ opacity: 1, transform: "translateX(0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
            >
              <DiscordMessages class="rounded-lg shadow">
                <DiscordMessage
                  profile="wouldyou"
                  author={profiles.wouldyou.author}
                  avatar={profiles.wouldyou.avatar}
                  roleColor={profiles.wouldyou.roleColor}
                  bot={profiles.wouldyou.bot}
                  verified={profiles.wouldyou.verified}
                  edited
                >
                  <DiscordCommand
                    slot="reply"
                    profile="dominik"
                    author={profiles.dominik.author}
                    avatar={profiles.dominik.avatar}
                    roleColor={profiles.dominik.roleColor}
                    command="/custom useful"
                  ></DiscordCommand>
                  <DiscordEmbed slot="embeds" color="#1e88e5">
                    <DiscordEmbedDescription> </DiscordEmbedDescription>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="Would you want this power?">
                        Your pocket can hold 10 items no matter the size.
                      </DiscordEmbedField>
                      <DiscordEmbedField fieldTitle="Stats">
                        Everyone who voted would want this power.
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFooter
                      timestamp={currentDate}
                      slot="footer"
                      footerImage="https://cdn.discordapp.com/attachments/1004008495483457546/1056748109700538429/Logo.png"
                    >
                      Would You
                    </DiscordEmbedFooter>
                  </DiscordEmbed>
                  <DiscordReactions slot="reactions">
                    <DiscordReaction name="✅" emoji="/check.svg" count={4}>
                      {" "}
                    </DiscordReaction>
                    <DiscordReaction
                      name="❌"
                      emoji="/x.svg"
                      count={1}
                    ></DiscordReaction>
                  </DiscordReactions>
                </DiscordMessage>

                <DiscordMessage
                  profile="sky"
                  author={profiles.sky.author}
                  avatar={profiles.sky.avatar}
                  roleColor={profiles.sky.roleColor}
                  bot={profiles.sky.bot}
                  verified={profiles.sky.verified}
                >
                  <DiscordReply
                    slot="reply"
                    profile="wouldyou"
                    author={profiles.wouldyou.author}
                    avatar={profiles.wouldyou.avatar}
                    roleColor={profiles.wouldyou.roleColor}
                    bot={profiles.wouldyou.bot}
                    verified={profiles.wouldyou.verified}
                  >
                    <p style={{ whiteSpace: "initial" }}>
                      Click to see commands
                    </p>
                  </DiscordReply>
                  I would sell the pants <br /> Profit
                </DiscordMessage>

                <DiscordMessage
                  profile="dominik"
                  author={profiles.dominik.author}
                  avatar={profiles.dominik.avatar}
                  roleColor={profiles.dominik.roleColor}
                  bot={profiles.dominik.bot}
                  verified={profiles.dominik.verified}
                >
                  It&apos;s not your pants <br /> Whatever pants you wear they
                  do that
                </DiscordMessage>

                <DiscordMessage
                  profile="sky"
                  author={profiles.sky.author}
                  avatar={profiles.sky.avatar}
                  roleColor={profiles.sky.roleColor}
                  bot={profiles.sky.bot}
                  verified={profiles.sky.verified}
                >
                  <DiscordReply
                    slot="reply"
                    profile="dominik"
                    author={profiles.dominik.author}
                    avatar={profiles.dominik.avatar}
                    roleColor={profiles.dominik.roleColor}
                  >
                    <p style={{ whiteSpace: "initial" }}>
                      Whatever pants you wear they do that
                    </p>
                  </DiscordReply>
                  Ohhhh
                </DiscordMessage>

                <DiscordMessage
                  profile="dominik"
                  author={profiles.dominik.author}
                  avatar={profiles.dominik.avatar}
                  roleColor={profiles.dominik.roleColor}
                  bot={profiles.dominik.bot}
                  verified={profiles.dominik.verified}
                >
                  So if you don&apos;t wear them you don&apos;t get the benefit
                </DiscordMessage>
              </DiscordMessages>
            </motion.div>
          </div>

          <div className="feature">
            <motion.div
              className="feature-mockup left"
              initial={{ opacity: 0, transform: "translateX(-50px)" }}
              whileInView={{ opacity: 1, transform: "translateX(0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
            >
              <DiscordMessages class="rounded-lg shadow">
                <DiscordMessage
                  profile="wouldyou"
                  author={profiles.wouldyou.author}
                  avatar={profiles.wouldyou.avatar}
                  roleColor={profiles.wouldyou.roleColor}
                  bot={profiles.wouldyou.bot}
                  verified={profiles.wouldyou.verified}
                >
                  <DiscordCommand
                    slot="reply"
                    profile="marc"
                    command="/custom rather"
                    author={profiles.marc.author}
                    avatar={profiles.marc.avatar}
                    roleColor={profiles.marc.roleColor}
                  ></DiscordCommand>
                  <DiscordEmbed slot="embeds" color="#1e88e5">
                    <DiscordEmbedDescription> </DiscordEmbedDescription>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="Would You rather have">
                        <DiscordCustomEmoji
                          name="one"
                          url="/1.svg"
                          embed-emoji
                        ></DiscordCustomEmoji>
                        Unlimited food but live in a small house
                      </DiscordEmbedField>
                      <DiscordEmbedField fieldTitle="or">
                        <DiscordCustomEmoji
                          name="two"
                          url="/2.svg"
                          embed-emoji
                        ></DiscordCustomEmoji>
                        Live in a big mansion but have limited food
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFooter
                      timestamp={currentDate}
                      slot="footer"
                      footer-image="https://cdn.discordapp.com/attachments/1004008495483457546/1056748109700538429/Logo.png"
                    >
                      Would You
                    </DiscordEmbedFooter>
                  </DiscordEmbed>
                  <DiscordReactions slot="reactions">
                    <DiscordReaction
                      name="1️⃣"
                      emoji="1.svg"
                      count={3}
                    ></DiscordReaction>
                    <DiscordReaction name="2️⃣" emoji="2.svg" count={2}>
                      {" "}
                    </DiscordReaction>
                  </DiscordReactions>
                </DiscordMessage>
              </DiscordMessages>
            </motion.div>
            <motion.div
              className="feature-info right"
              initial={{ opacity: 0, transform: "translateX(50px)" }}
              whileInView={{ opacity: 1, transform: "translateX(0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
            >
              <h4>Upgrade your server</h4>
              <p>
                Customized responses make your server unique and stand out from
                the crowd.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="invite">
          <motion.h2
            initial={{ opacity: 0, transform: "translateY(10px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
          >
            Keep Your Server Active - <span className="red">Would</span>{" "}
            <span className="blue">You</span>
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, transform: "translateY(10px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
          >
            Invite Me To Your Server Now.
          </motion.h3>
          <motion.button
            className="wy-button primary"
            initial={{ opacity: 0, transform: "translateY(-20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
          >
            Invite
          </motion.button>
        </section>
      </main>

      <Footer />
    </>
  );
}

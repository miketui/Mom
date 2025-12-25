/**
 * ChapterVisualArtifacts.jsx
 * Visual React artifacts for "Curls & Contemplation: A Creative Hairstylist's Workbook"
 *
 * This file showcases page layout styling for all 16 chapters
 * based on the updated style.css design system.
 *
 * Design System:
 * - Primary Brand: Teal (#2B9999, #3DB3B3, #1F7272)
 * - Accent Brand: Gold (#C9A961, #D4B976, #B08F4A)
 * - Typography: Cinzel Decorative (display), Libre Baskerville (body), Montserrat (meta)
 */

import React, { useState } from 'react';

// ============================================================================
// CSS DESIGN TOKENS (from style.css)
// ============================================================================
const tokens = {
  colors: {
    tealPrimary: '#2B9999',
    tealLight: '#3DB3B3',
    tealDark: '#1F7272',
    tealMuted: 'rgba(43, 153, 153, 0.15)',
    tealTransparent: 'rgba(43, 153, 153, 0.06)',
    goldAccent: '#C9A961',
    goldLight: '#D4B976',
    goldDark: '#B08F4A',
    goldMuted: 'rgba(201, 169, 97, 0.2)',
    goldMutedDark: 'rgba(201, 169, 97, 0.15)',
    goldTransparent: 'rgba(201, 169, 97, 0.08)',
    ink: '#0F1616',
    inkMedium: '#2B2B2B',
    paper: '#F7F9F9',
    cream: '#F5F3EF',
    muted: '#9AA7A7',
    mutedLight: '#666666',
    white: '#FFFFFF',
    black: '#000000',
  },
  fonts: {
    display: "'Cinzel Decorative', Georgia, 'Times New Roman', serif",
    body: "'Libre Baskerville', Georgia, 'Times New Roman', serif",
    meta: "'Montserrat', Arial, 'Helvetica Neue', sans-serif",
  },
  spacing: {
    1: '0.5rem',
    2: '0.75rem',
    3: '1rem',
    4: '1.5rem',
    5: '1.75rem',
    6: '2rem',
    7: '2.5rem',
    8: '3rem',
    10: '4rem',
    12: '5rem',
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(15, 22, 22, 0.1)',
    md: '0 4px 6px rgba(15, 22, 22, 0.1)',
    lg: '0 10px 15px rgba(15, 22, 22, 0.15)',
    xl: '0 20px 25px rgba(15, 22, 22, 0.2)',
  },
};

// ============================================================================
// CHAPTER DATA
// ============================================================================
const chapters = [
  {
    number: 'I',
    title: ['UNVEILING', 'YOUR', 'CREATIVE', 'ODYSSEY'],
    quote: 'For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.',
    reference: 'Ephesians 2:10',
    intro: 'Picture celebrity stylist Ursula Stephen, who transformed Rihanna\'s look early in her career, catapulting both the singer\'s and her own careers to new heights.',
    part: 'Part I: Foundations of Creative Hairstyling',
    darkTheme: false,
  },
  {
    number: 'II',
    title: ['REFINING', 'YOUR', 'CREATIVE', 'TOOLKIT'],
    quote: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.',
    reference: 'Colossians 3:23',
    intro: 'Every master craftsperson knows that the quality of their work depends not only on their skills but also on the tools they wield.',
    part: 'Part I: Foundations of Creative Hairstyling',
    darkTheme: true,
  },
  {
    number: 'III',
    title: ['REIGNITING', 'YOUR', 'CREATIVE', 'FIRE'],
    quote: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.',
    reference: 'Romans 12:2',
    intro: 'Creativity is the lifeblood of the hairstyling profession—the spark that transforms routine cuts into works of art.',
    part: 'Part I: Foundations of Creative Hairstyling',
    darkTheme: false,
  },
  {
    number: 'IV',
    title: ['THE ART OF', 'NETWORKING IN', 'FREELANCE', 'HAIRSTYLING'],
    quote: 'Two are better than one, because they have a good return for their labor.',
    reference: 'Ecclesiastes 4:9',
    intro: 'In the freelance world, your network is your net worth. Building genuine connections opens doors to opportunities.',
    part: 'Part II: Building Your Professional Practice',
    darkTheme: true,
  },
  {
    number: 'V',
    title: ['CULTIVATING', 'CREATIVE', 'EXCELLENCE', 'THROUGH', 'MENTORSHIP'],
    quote: 'Iron sharpens iron, and one person sharpens another.',
    reference: 'Proverbs 27:17',
    intro: 'The path to mastery is rarely walked alone. Throughout history, the greatest artists have learned from those who came before.',
    part: 'Part II: Building Your Professional Practice',
    darkTheme: false,
  },
  {
    number: 'VI',
    title: ['MASTERING', 'THE BUSINESS', 'OF', 'HAIRSTYLING'],
    quote: 'The plans of the diligent lead surely to abundance.',
    reference: 'Proverbs 21:5',
    intro: 'Beyond the artistry lies the foundation of a sustainable career—understanding the business side of hairstyling.',
    part: 'Part II: Building Your Professional Practice',
    darkTheme: true,
  },
  {
    number: 'VII',
    title: ['EMBRACING', 'WELLNESS', 'AND', 'SELF-CARE'],
    quote: 'Come to me, all you who are weary and burdened, and I will give you rest.',
    reference: 'Matthew 11:28',
    intro: 'As hairstylists, we dedicate ourselves to enhancing others\' well-being, yet often neglect our own.',
    part: 'Part II: Building Your Professional Practice',
    darkTheme: false,
  },
  {
    number: 'VIII',
    title: ['ADVANCING', 'SKILLS', 'THROUGH', 'CONTINUOUS', 'EDUCATION'],
    quote: 'The heart of the discerning acquires knowledge, for the ears of the wise seek it out.',
    reference: 'Proverbs 18:15',
    intro: 'The beauty industry evolves rapidly, with new techniques, tools, and trends emerging constantly.',
    part: 'Part II: Building Your Professional Practice',
    darkTheme: true,
  },
  {
    number: 'IX',
    title: ['STEPPING', 'INTO', 'LEADERSHIP'],
    quote: 'Whoever wants to become great among you must be your servant.',
    reference: 'Matthew 20:26',
    intro: 'Leadership in hairstyling extends beyond technical mastery—it\'s about inspiring and guiding others.',
    part: 'Part III: Advanced Business Strategies',
    darkTheme: false,
  },
  {
    number: 'X',
    title: ['CRAFTING', 'ENDURING', 'LEGACIES'],
    quote: 'A good name is more desirable than great riches; to be esteemed is better than silver or gold.',
    reference: 'Proverbs 22:1',
    intro: 'Your legacy is not just what you create, but what you leave behind for others to build upon.',
    part: 'Part III: Advanced Business Strategies',
    darkTheme: true,
  },
  {
    number: 'XI',
    title: ['ADVANCED', 'DIGITAL', 'STRATEGIES FOR', 'FREELANCE', 'HAIRSTYLISTS'],
    quote: 'Let your light shine before others, that they may see your good deeds.',
    reference: 'Matthew 5:16',
    intro: 'In today\'s digital age, your online presence can be as powerful as your physical portfolio.',
    part: 'Part III: Advanced Business Strategies',
    darkTheme: false,
  },
  {
    number: 'XII',
    title: ['FINANCIAL', 'WISDOM', 'BUILDING', 'SUSTAINABLE', 'VENTURES'],
    quote: 'The wise store up choice food and olive oil, but fools gulp theirs down.',
    reference: 'Proverbs 21:20',
    intro: 'Financial literacy is the cornerstone of a thriving freelance career in hairstyling.',
    part: 'Part III: Advanced Business Strategies',
    darkTheme: true,
  },
  {
    number: 'XIII',
    title: ['EMBRACING', 'ETHICS AND', 'SUSTAINABILITY', 'IN', 'HAIRSTYLING'],
    quote: 'The earth is the Lord\'s, and everything in it.',
    reference: 'Psalm 24:1',
    intro: 'As conscious hairstylists, we have the responsibility to consider the environmental impact of our craft.',
    part: 'Part III: Advanced Business Strategies',
    darkTheme: false,
  },
  {
    number: 'XIV',
    title: ['THE IMPACT', 'OF AI ON', 'THE BEAUTY', 'INDUSTRY'],
    quote: 'See, I am doing a new thing! Now it springs up; do you not perceive it?',
    reference: 'Isaiah 43:19',
    intro: 'Artificial intelligence is reshaping every industry, and beauty is no exception.',
    part: 'Part IV: Future-Focused Growth',
    darkTheme: true,
  },
  {
    number: 'XV',
    title: ['CULTIVATING', 'RESILIENCE', 'AND', 'WELL-BEING', 'IN', 'HAIRSTYLING'],
    quote: 'Consider it pure joy whenever you face trials of many kinds.',
    reference: 'James 1:2',
    intro: 'The path of a hairstylist is filled with challenges that test our resolve and resilience.',
    part: 'Part IV: Future-Focused Growth',
    darkTheme: false,
  },
  {
    number: 'XVI',
    title: ['TRESSES AND', 'TEXTURES', 'EMBRACING', 'DIVERSITY IN', 'HAIRSTYLING'],
    quote: 'There is neither Jew nor Gentile... for you are all one in Christ Jesus.',
    reference: 'Galatians 3:28',
    intro: 'Celebrating diversity in hair textures honors the rich tapestry of human beauty across cultures.',
    part: 'Part IV: Future-Focused Growth',
    darkTheme: true,
  },
];

// ============================================================================
// STYLE OBJECTS
// ============================================================================
const styles = {
  // Container for all artifacts
  artifactsContainer: {
    fontFamily: tokens.fonts.body,
    backgroundColor: tokens.colors.paper,
    minHeight: '100vh',
  },

  // Navigation
  nav: {
    position: 'sticky',
    top: 0,
    backgroundColor: tokens.colors.tealPrimary,
    padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacing[2],
    justifyContent: 'center',
    zIndex: 100,
    boxShadow: tokens.shadows.lg,
  },
  navButton: {
    fontFamily: tokens.fonts.meta,
    fontSize: '0.875rem',
    padding: `${tokens.spacing[1]} ${tokens.spacing[3]}`,
    backgroundColor: 'transparent',
    color: tokens.colors.white,
    border: `1px solid ${tokens.colors.tealLight}`,
    borderRadius: tokens.radius.full,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  navButtonActive: {
    backgroundColor: tokens.colors.goldAccent,
    borderColor: tokens.colors.goldAccent,
    color: tokens.colors.ink,
  },

  // Chapter Title Page (Light Theme)
  chapTitle: {
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: `${tokens.spacing[10]} ${tokens.spacing[4]} ${tokens.spacing[6]}`,
    textAlign: 'center',
    backgroundColor: tokens.colors.white,
    borderBottom: `4px solid ${tokens.colors.tealMuted}`,
  },
  chapTitleDark: {
    backgroundColor: tokens.colors.black,
    color: tokens.colors.white,
    borderBottom: `4px solid ${tokens.colors.goldAccent}`,
  },

  // Chapter Number Figure
  chapterNumberFigure: {
    position: 'relative',
    width: 'clamp(140px, 28vw, 180px)',
    height: 'clamp(100px, 20vw, 130px)',
    margin: `0 auto ${tokens.spacing[7]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Brushstroke SVG Background
  brushstroke: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 1,
  },

  // Roman Numeral
  chapterNumberRoman: {
    position: 'relative',
    zIndex: 1,
    fontFamily: tokens.fonts.display,
    fontSize: 'clamp(2.5rem, 7vw, 3.5rem)',
    fontWeight: 400,
    fontStyle: 'italic',
    color: tokens.colors.tealDark,
    letterSpacing: '0.02em',
  },
  chapterNumberRomanDark: {
    color: tokens.colors.white,
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },

  // Title Stack
  titleStack: {
    marginBottom: tokens.spacing[7],
    maxWidth: '700px',
    width: '100%',
  },
  titleBar: {
    height: '3px',
    width: '50px',
    margin: `0 auto ${tokens.spacing[4]}`,
    background: tokens.colors.goldAccent,
    borderRadius: tokens.radius.full,
  },
  titleLines: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.15em',
  },
  titleLine: {
    fontFamily: tokens.fonts.display,
    fontSize: 'clamp(1.6rem, 4.5vw, 2.2rem)',
    fontWeight: 400,
    color: tokens.colors.tealPrimary,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    lineHeight: 1.15,
  },
  titleLineDark: {
    color: tokens.colors.white,
  },

  // Bible Quote Container
  bibleQuoteContainer: {
    maxWidth: '480px',
    width: '90%',
    margin: `0 auto ${tokens.spacing[6]}`,
    padding: `${tokens.spacing[4]} ${tokens.spacing[5]} ${tokens.spacing[4]} ${tokens.spacing[6]}`,
    background: tokens.colors.cream,
    borderRadius: tokens.radius.md,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    borderLeft: `3px solid ${tokens.colors.goldAccent}`,
  },
  bibleQuoteContainerDark: {
    background: 'transparent',
    borderLeft: `4px solid ${tokens.colors.goldAccent}`,
    boxShadow: 'none',
    borderRadius: 0,
  },
  bibleQuoteText: {
    fontFamily: tokens.fonts.body,
    fontSize: 'clamp(0.94rem, 0.9vw, 1.05rem)',
    fontStyle: 'italic',
    lineHeight: 1.7,
    color: tokens.colors.inkMedium,
    marginBottom: tokens.spacing[2],
    textAlign: 'center',
  },
  bibleQuoteTextDark: {
    color: tokens.colors.goldLight,
  },
  bibleQuoteReference: {
    fontFamily: tokens.fonts.meta,
    fontSize: '0.85rem',
    color: tokens.colors.goldDark,
    fontWeight: 600,
    textAlign: 'right',
    fontStyle: 'italic',
  },
  bibleQuoteReferenceDark: {
    color: tokens.colors.white,
    fontWeight: 500,
  },

  // Introduction Section
  introductionHeading: {
    fontFamily: tokens.fonts.display,
    fontSize: 'clamp(1.25rem, 1.6vw, 1.5rem)',
    color: tokens.colors.tealPrimary,
    textAlign: 'center',
    margin: `${tokens.spacing[5]} 0 ${tokens.spacing[4]}`,
    fontWeight: 400,
  },
  introductionHeadingDark: {
    color: tokens.colors.white,
  },
  introductionParagraph: {
    maxWidth: '60ch',
    margin: '0 auto',
    textAlign: 'justify',
    fontSize: 'clamp(0.94rem, 0.9vw, 1.05rem)',
    lineHeight: 1.75,
    color: tokens.colors.ink,
  },
  introductionParagraphDark: {
    color: tokens.colors.white,
  },

  // Drop Cap
  dropCap: {
    fontFamily: tokens.fonts.display,
    fontSize: '3.2em',
    fontWeight: 700,
    lineHeight: 0.85,
    float: 'left',
    marginRight: '0.08em',
    color: tokens.colors.tealPrimary,
  },
  dropCapDark: {
    color: tokens.colors.tealLight,
  },

  // Chapter Body
  chapBody: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: `${tokens.spacing[6]} ${tokens.spacing[4]}`,
    backgroundColor: tokens.colors.white,
  },
  contentAreaH2: {
    fontFamily: tokens.fonts.display,
    fontSize: 'clamp(1.8rem, 2.8vw, 2.25rem)',
    color: tokens.colors.tealPrimary,
    marginTop: tokens.spacing[8],
    paddingBottom: tokens.spacing[2],
    borderBottom: `2px solid ${tokens.colors.goldMuted}`,
    fontWeight: 400,
  },
  contentAreaH3: {
    fontFamily: tokens.fonts.display,
    fontSize: 'clamp(1.5rem, 2.2vw, 1.875rem)',
    color: tokens.colors.tealDark,
    marginTop: tokens.spacing[6],
    fontWeight: 400,
  },
  bodyParagraph: {
    fontFamily: tokens.fonts.body,
    fontSize: 'clamp(1.05rem, 1.1vw, 1.2rem)',
    lineHeight: 1.6,
    marginBottom: tokens.spacing[4],
    color: tokens.colors.ink,
  },

  // Blockquote
  blockquote: {
    margin: `${tokens.spacing[6]} ${tokens.spacing[4]}`,
    padding: `${tokens.spacing[4]} ${tokens.spacing[5]}`,
    borderLeft: `4px solid ${tokens.colors.goldAccent}`,
    fontStyle: 'italic',
    color: tokens.colors.mutedLight,
    backgroundColor: tokens.colors.cream,
    borderRadius: tokens.radius.md,
  },

  // Quiz Section
  quiz: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: `${tokens.spacing[6]} ${tokens.spacing[4]}`,
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colors.white,
    borderTop: `3px solid ${tokens.colors.tealPrimary}`,
  },
  quizHeader: {
    textAlign: 'center',
    marginBottom: tokens.spacing[5],
    paddingBottom: tokens.spacing[3],
    borderBottom: `3px solid ${tokens.colors.tealPrimary}`,
  },
  quizTitle: {
    fontFamily: tokens.fonts.display,
    fontSize: 'clamp(1.5rem, 2.2vw, 1.875rem)',
    color: tokens.colors.tealPrimary,
    marginBottom: tokens.spacing[2],
  },
  quizInstructions: {
    fontFamily: tokens.fonts.body,
    fontSize: 'clamp(0.94rem, 0.9vw, 1.05rem)',
    color: tokens.colors.mutedLight,
    fontStyle: 'italic',
  },
  mcqItem: {
    marginBottom: tokens.spacing[4],
  },
  questionText: {
    fontFamily: tokens.fonts.body,
    fontSize: 'clamp(1.05rem, 1.1vw, 1.2rem)',
    fontWeight: 600,
    color: tokens.colors.ink,
    marginBottom: tokens.spacing[2],
    lineHeight: 1.4,
  },
  mcqOptions: {
    listStyle: 'upper-alpha',
    paddingLeft: tokens.spacing[6],
    marginTop: tokens.spacing[2],
  },
  option: {
    marginBottom: tokens.spacing[1],
    paddingLeft: tokens.spacing[2],
    lineHeight: 1.6,
    color: tokens.colors.inkMedium,
    fontSize: 'clamp(0.94rem, 0.9vw, 1.05rem)',
  },

  // Worksheet Section
  worksheet: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: `${tokens.spacing[5]} ${tokens.spacing[4]}`,
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colors.white,
    borderTop: `3px solid ${tokens.colors.goldAccent}`,
  },
  worksheetHeader: {
    textAlign: 'center',
    padding: tokens.spacing[4],
    marginBottom: tokens.spacing[4],
  },
  worksheetTitle: {
    fontFamily: tokens.fonts.display,
    fontSize: 'clamp(1.5rem, 2.2vw, 1.875rem)',
    color: tokens.colors.tealPrimary,
    marginBottom: tokens.spacing[1],
  },
  worksheetSubtitle: {
    fontFamily: tokens.fonts.body,
    fontSize: 'clamp(0.94rem, 0.9vw, 1.05rem)',
    fontStyle: 'italic',
    color: tokens.colors.goldDark,
  },
  promptContainer: {
    marginBottom: tokens.spacing[4],
  },
  promptLabel: {
    fontFamily: tokens.fonts.body,
    fontSize: 'clamp(0.94rem, 0.9vw, 1.05rem)',
    fontWeight: 600,
    marginBottom: tokens.spacing[2],
    color: tokens.colors.ink,
    lineHeight: 1.4,
  },
  promptNumber: {
    color: tokens.colors.tealPrimary,
    fontWeight: 700,
    marginRight: tokens.spacing[1],
  },
  line: {
    borderBottom: `1px solid ${tokens.colors.muted}`,
    minHeight: '1.5rem',
    marginBottom: tokens.spacing[2],
  },

  // Quote Page
  imageQuote: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacing[6],
    backgroundColor: tokens.colors.white,
  },
  quoteFigure: {
    maxWidth: '90%',
    maxHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colors.cream,
    padding: tokens.spacing[8],
    borderRadius: tokens.radius.lg,
    boxShadow: tokens.shadows.lg,
  },
  quoteImagePlaceholder: {
    width: '400px',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: tokens.colors.tealPrimary,
  },

  // Part Badge
  partBadge: {
    fontFamily: tokens.fonts.meta,
    fontSize: '0.75rem',
    color: tokens.colors.goldDark,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: tokens.spacing[4],
    padding: `${tokens.spacing[1]} ${tokens.spacing[3]}`,
    backgroundColor: tokens.colors.goldTransparent,
    borderRadius: tokens.radius.full,
    border: `1px solid ${tokens.colors.goldMuted}`,
  },
  partBadgeDark: {
    color: tokens.colors.goldLight,
    backgroundColor: tokens.colors.goldMutedDark,
  },

  // Footer
  footer: {
    marginTop: 'auto',
    paddingTop: tokens.spacing[3],
    textAlign: 'center',
  },
  ruleGold: {
    height: '2px',
    background: `linear-gradient(90deg, ${tokens.colors.goldAccent}, transparent 60%)`,
    marginBottom: tokens.spacing[2],
    border: 'none',
  },
  printInstruction: {
    fontFamily: tokens.fonts.meta,
    fontSize: 'clamp(0.94rem, 0.9vw, 1.05rem)',
    fontStyle: 'italic',
    color: tokens.colors.muted,
  },

  // Page type tabs
  pageTabs: {
    display: 'flex',
    justifyContent: 'center',
    gap: tokens.spacing[2],
    marginBottom: tokens.spacing[4],
    padding: tokens.spacing[3],
    backgroundColor: tokens.colors.cream,
    borderRadius: tokens.radius.lg,
  },
  pageTab: {
    fontFamily: tokens.fonts.meta,
    fontSize: '0.875rem',
    padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
    backgroundColor: 'transparent',
    color: tokens.colors.tealPrimary,
    border: `2px solid ${tokens.colors.tealMuted}`,
    borderRadius: tokens.radius.full,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  pageTabActive: {
    backgroundColor: tokens.colors.tealPrimary,
    color: tokens.colors.white,
    borderColor: tokens.colors.tealPrimary,
  },
};

// ============================================================================
// BRUSHSTROKE SVG COMPONENT
// ============================================================================
const BrushstrokeSVG = () => (
  <svg
    viewBox="0 0 180 130"
    style={styles.brushstroke}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20 65c0-25 15-45 70-45s70 20 70 45-15 45-70 45-70-20-70-45z"
      fill={tokens.colors.tealPrimary}
      opacity="0.95"
    />
    <path
      d="M25 62c5-20 20-38 65-38s55 15 62 38c-5 20-20 38-62 38s-60-18-65-38z"
      fill={tokens.colors.tealLight}
      opacity="0.6"
    />
  </svg>
);

// ============================================================================
// CHAPTER TITLE PAGE COMPONENT
// ============================================================================
const ChapterTitlePage = ({ chapter }) => {
  const isDark = chapter.darkTheme;

  return (
    <section style={{
      ...styles.chapTitle,
      ...(isDark ? styles.chapTitleDark : {}),
    }}>
      {/* Part Badge */}
      <span style={{
        ...styles.partBadge,
        ...(isDark ? styles.partBadgeDark : {}),
      }}>
        {chapter.part}
      </span>

      {/* Chapter Number Emblem */}
      <figure style={styles.chapterNumberFigure}>
        <BrushstrokeSVG dark={isDark} />
        <span style={{
          ...styles.chapterNumberRoman,
          ...(isDark ? styles.chapterNumberRomanDark : {}),
        }}>
          {chapter.number}
        </span>
      </figure>

      {/* Title Stack */}
      <div style={styles.titleStack}>
        <div style={styles.titleBar}></div>
        <div style={styles.titleLines}>
          {chapter.title.map((line, idx) => (
            <span key={idx} style={{
              ...styles.titleLine,
              ...(isDark ? styles.titleLineDark : {}),
            }}>
              {line}
            </span>
          ))}
        </div>
      </div>

      {/* Scripture Quote */}
      <div style={{
        ...styles.bibleQuoteContainer,
        ...(isDark ? styles.bibleQuoteContainerDark : {}),
      }}>
        <p style={{
          ...styles.bibleQuoteText,
          ...(isDark ? styles.bibleQuoteTextDark : {}),
        }}>
          "{chapter.quote}"
        </p>
        <cite style={{
          ...styles.bibleQuoteReference,
          ...(isDark ? styles.bibleQuoteReferenceDark : {}),
        }}>
          — {chapter.reference}
        </cite>
      </div>

      {/* Introduction */}
      <h2 style={{
        ...styles.introductionHeading,
        ...(isDark ? styles.introductionHeadingDark : {}),
      }}>
        Introduction
      </h2>
      <div style={{
        ...styles.introductionParagraph,
        ...(isDark ? styles.introductionParagraphDark : {}),
      }}>
        <span style={{
          ...styles.dropCap,
          ...(isDark ? styles.dropCapDark : {}),
        }}>
          {chapter.intro.charAt(0)}
        </span>
        {chapter.intro.slice(1)}
      </div>
    </section>
  );
};

// ============================================================================
// CHAPTER BODY COMPONENT
// ============================================================================
const ChapterBodyPage = ({ chapter }) => (
  <section style={styles.chapBody}>
    <h2 style={styles.contentAreaH2}>
      Chapter {chapter.number}: {chapter.title.join(' ')}
    </h2>

    <blockquote style={styles.blockquote}>
      <p>"{chapter.quote}"</p>
      <p style={{ textAlign: 'right', marginBottom: 0 }}>— {chapter.reference}</p>
    </blockquote>

    <p style={styles.bodyParagraph}>
      {chapter.intro}
    </p>

    <h3 style={styles.contentAreaH3}>
      I. Key Concepts and Foundations
    </h3>
    <p style={styles.bodyParagraph}>
      This section explores the fundamental principles that underpin the chapter's theme.
      Understanding these core concepts provides a solid foundation for practical application
      in your hairstyling practice.
    </p>

    <h3 style={styles.contentAreaH3}>
      II. Practical Applications
    </h3>
    <p style={styles.bodyParagraph}>
      Here we translate theory into action with concrete steps you can implement immediately.
      Each actionable strategy has been developed from real-world experience and industry best practices.
    </p>

    <h3 style={styles.contentAreaH3}>
      III. Case Studies and Examples
    </h3>
    <p style={styles.bodyParagraph}>
      Learning from others' experiences accelerates growth. These case studies highlight both
      successes and challenges from seasoned professionals in the hairstyling industry.
    </p>

    <div style={styles.footer}>
      <hr style={styles.ruleGold} />
      <p style={styles.printInstruction}>
        Continue to Chapter Quiz →
      </p>
    </div>
  </section>
);

// ============================================================================
// QUIZ PAGE COMPONENT
// ============================================================================
const QuizPage = ({ chapter }) => (
  <section style={styles.quiz}>
    <div style={styles.quizHeader}>
      <h2 style={styles.quizTitle}>Chapter {chapter.number} Quiz</h2>
      <p style={styles.quizInstructions}>
        Test your understanding of the key concepts. Select the best answer for each question.
      </p>
    </div>

    <ol style={{ paddingLeft: 0, listStyle: 'none' }}>
      <li style={styles.mcqItem}>
        <p style={styles.questionText}>
          1. What is the primary focus of this chapter?
        </p>
        <ol style={styles.mcqOptions}>
          <li style={styles.option}>Technical hairstyling techniques only</li>
          <li style={styles.option}>The transformative power of conscious hairstyling</li>
          <li style={styles.option}>Product recommendations for clients</li>
          <li style={styles.option}>Salon management basics</li>
        </ol>
      </li>

      <li style={styles.mcqItem}>
        <p style={styles.questionText}>
          2. According to the chapter, what role do hairstylists play beyond technical skills?
        </p>
        <ol style={styles.mcqOptions}>
          <li style={styles.option}>Salespeople for hair products</li>
          <li style={styles.option}>Artists, confidants, and agents of change</li>
          <li style={styles.option}>Fashion consultants only</li>
          <li style={styles.option}>None of the above</li>
        </ol>
      </li>

      <li style={styles.mcqItem}>
        <p style={styles.questionText}>
          3. What does the author suggest is essential for building client relationships?
        </p>
        <ol style={styles.mcqOptions}>
          <li style={styles.option}>Offering discounts and promotions</li>
          <li style={styles.option}>Active listening and empathy</li>
          <li style={styles.option}>Having the latest equipment</li>
          <li style={styles.option}>Social media presence only</li>
        </ol>
      </li>
    </ol>

    <div style={styles.footer}>
      <hr style={styles.ruleGold} />
      <p style={styles.printInstruction}>
        Print this page to complete offline. Check your answers in the Quiz Key.
      </p>
    </div>
  </section>
);

// ============================================================================
// WORKSHEET PAGE COMPONENT
// ============================================================================
const WorksheetPage = ({ chapter }) => (
  <section style={styles.worksheet}>
    <div style={styles.worksheetHeader}>
      <h2 style={styles.worksheetTitle}>Chapter {chapter.number} Reflection Worksheet</h2>
      <p style={styles.worksheetSubtitle}>
        Take time to reflect on and apply what you've learned
      </p>
    </div>

    <div style={{ flex: 1 }}>
      <div style={styles.promptContainer}>
        <div style={styles.promptLabel}>
          <span style={styles.promptNumber}>1.</span>
          What key insight from this chapter resonated most with your personal experience?
        </div>
        <div style={styles.line}></div>
        <div style={styles.line}></div>
        <div style={styles.line}></div>
      </div>

      <div style={styles.promptContainer}>
        <div style={styles.promptLabel}>
          <span style={styles.promptNumber}>2.</span>
          Identify one actionable step you will implement in your practice this week:
        </div>
        <div style={styles.line}></div>
        <div style={styles.line}></div>
        <div style={styles.line}></div>
      </div>

      <div style={styles.promptContainer}>
        <div style={styles.promptLabel}>
          <span style={styles.promptNumber}>3.</span>
          How might these concepts help you better serve your clients?
        </div>
        <div style={styles.line}></div>
        <div style={styles.line}></div>
        <div style={styles.line}></div>
      </div>
    </div>

    <div style={styles.footer}>
      <hr style={styles.ruleGold} />
      <p style={styles.printInstruction}>
        Print this worksheet to complete by hand for deeper reflection.
      </p>
    </div>
  </section>
);

// ============================================================================
// QUOTE PAGE COMPONENT
// ============================================================================
const QuotePage = ({ chapter }) => (
  <section style={styles.imageQuote}>
    <figure style={styles.quoteFigure}>
      <div style={styles.quoteImagePlaceholder}>
        <div style={{
          fontFamily: tokens.fonts.display,
          fontSize: '6rem',
          color: tokens.colors.tealPrimary,
          marginBottom: tokens.spacing[4],
        }}>
          "
        </div>
        <p style={{
          fontFamily: tokens.fonts.body,
          fontSize: '1.25rem',
          fontStyle: 'italic',
          lineHeight: 1.8,
          color: tokens.colors.inkMedium,
          maxWidth: '350px',
          marginBottom: tokens.spacing[4],
        }}>
          {chapter.quote}
        </p>
        <cite style={{
          fontFamily: tokens.fonts.meta,
          fontSize: '1rem',
          color: tokens.colors.goldDark,
          fontWeight: 600,
        }}>
          — {chapter.reference}
        </cite>
        <div style={{
          marginTop: tokens.spacing[6],
          fontFamily: tokens.fonts.meta,
          fontSize: '0.875rem',
          color: tokens.colors.muted,
        }}>
          Chapter {chapter.number} Inspirational Quote
        </div>
      </div>
    </figure>
  </section>
);

// ============================================================================
// MAIN ARTIFACTS COMPONENT
// ============================================================================
const ChapterVisualArtifacts = () => {
  const [activeChapter, setActiveChapter] = useState(0);
  const [activePageType, setActivePageType] = useState('title');

  const pageTypes = [
    { id: 'title', label: 'Title Page' },
    { id: 'body', label: 'Body Content' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'worksheet', label: 'Worksheet' },
    { id: 'quote', label: 'Quote Page' },
  ];

  const renderPage = () => {
    const chapter = chapters[activeChapter];
    switch (activePageType) {
      case 'title':
        return <ChapterTitlePage chapter={chapter} />;
      case 'body':
        return <ChapterBodyPage chapter={chapter} />;
      case 'quiz':
        return <QuizPage chapter={chapter} />;
      case 'worksheet':
        return <WorksheetPage chapter={chapter} />;
      case 'quote':
        return <QuotePage chapter={chapter} />;
      default:
        return <ChapterTitlePage chapter={chapter} />;
    }
  };

  return (
    <div style={styles.artifactsContainer}>
      {/* CSS for focus styles (pseudo-classes not supported in inline styles) */}
      <style>{`
        .nav-button:focus {
          outline: 2px solid ${tokens.colors.goldAccent};
          outline-offset: 2px;
        }
        .page-tab:focus {
          outline: 2px solid ${tokens.colors.tealDark};
          outline-offset: 2px;
        }
      `}</style>

      {/* Header */}
      <header style={{
        backgroundColor: tokens.colors.ink,
        color: tokens.colors.white,
        padding: `${tokens.spacing[6]} ${tokens.spacing[4]}`,
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: tokens.fonts.display,
          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
          marginBottom: tokens.spacing[2],
          color: tokens.colors.goldAccent,
        }}>
          Curls & Contemplation
        </h1>
        <p style={{
          fontFamily: tokens.fonts.meta,
          fontSize: '0.875rem',
          color: tokens.colors.muted,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Visual Style Artifacts — Page Layout Preview
        </p>
      </header>

      {/* Chapter Navigation */}
      <nav style={styles.nav}>
        {chapters.map((chapter, idx) => (
          <button
            key={idx}
            onClick={() => setActiveChapter(idx)}
            className="nav-button"
            style={{
              ...styles.navButton,
              ...(activeChapter === idx ? styles.navButtonActive : {}),
            }}
          >
            Ch. {chapter.number}
          </button>
        ))}
      </nav>

      {/* Page Type Tabs */}
      <div style={{ padding: tokens.spacing[4], backgroundColor: tokens.colors.paper }}>
        <div style={styles.pageTabs}>
          {pageTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActivePageType(type.id)}
              className="page-tab"
              style={{
                ...styles.pageTab,
                ...(activePageType === type.id ? styles.pageTabActive : {}),
              }}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Chapter Info */}
        <div style={{
          textAlign: 'center',
          marginBottom: tokens.spacing[4],
          padding: tokens.spacing[3],
          backgroundColor: tokens.colors.white,
          borderRadius: tokens.radius.lg,
          boxShadow: tokens.shadows.sm,
        }}>
          <h2 style={{
            fontFamily: tokens.fonts.display,
            fontSize: '1.25rem',
            color: tokens.colors.tealPrimary,
            marginBottom: tokens.spacing[1],
          }}>
            Chapter {chapters[activeChapter].number}: {chapters[activeChapter].title.join(' ')}
          </h2>
          <p style={{
            fontFamily: tokens.fonts.meta,
            fontSize: '0.875rem',
            color: tokens.colors.muted,
          }}>
            {chapters[activeChapter].part} • Theme: {chapters[activeChapter].darkTheme ? 'Dark' : 'Light'}
          </p>
        </div>
      </div>

      {/* Page Content */}
      <main style={{
        boxShadow: tokens.shadows.xl,
        margin: `0 ${tokens.spacing[4]} ${tokens.spacing[8]}`,
        borderRadius: tokens.radius.lg,
        overflow: 'hidden',
      }}>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: tokens.colors.ink,
        color: tokens.colors.muted,
        padding: `${tokens.spacing[6]} ${tokens.spacing[4]}`,
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: tokens.fonts.meta,
          fontSize: '0.875rem',
          marginBottom: tokens.spacing[2],
        }}>
          Design System based on style.css v2.0 — Hybrid Brand System
        </p>
        <p style={{
          fontFamily: tokens.fonts.body,
          fontSize: '0.75rem',
          color: tokens.colors.mutedLight,
        }}>
          Teal Primary: #2B9999 | Gold Accent: #C9A961 | Typography: Cinzel Decorative, Libre Baskerville, Montserrat
        </p>
      </footer>
    </div>
  );
};

export default ChapterVisualArtifacts;

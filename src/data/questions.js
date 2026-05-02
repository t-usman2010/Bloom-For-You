const questions = [
  {
    id: 'mood',
    question: "What's your current mood?",
    options: [
      { value: 'joyful', label: 'Joyful \u{1F338}' },
      { value: 'dreamy', label: 'Dreamy \u{1F319}' },
      { value: 'romantic', label: 'Romantic \u{1F495}' },
      { value: 'bold', label: 'Bold \u{1F525}' },
    ],
  },
  {
    id: 'palette',
    question: 'Pick your favorite color palette:',
    options: [
      { value: 'pastel', label: 'Pastel Pinks' },
      { value: 'deep', label: 'Deep Reds & Purples' },
      { value: 'warm', label: 'Warm Oranges & Yellows' },
      { value: 'cool', label: 'Cool Whites & Blues' },
    ],
  },
  {
    id: 'flower',
    question: "What's your favorite flower?",
    options: [
      { value: 'rose', label: 'Roses \u{1F339}' },
      { value: 'sunflower', label: 'Sunflowers \u{1F33B}' },
      { value: 'tulip', label: 'Tulips \u{1F337}' },
      { value: 'wildflower', label: 'Wildflowers \u{1F490}' },
    ],
  },
  {
    id: 'size',
    question: 'How big should your bouquet be?',
    options: [
      { value: 'small', label: 'Small (3-5)' },
      { value: 'medium', label: 'Medium (7-10)' },
      { value: 'grand', label: 'Grand (12+)' },
      { value: 'garden', label: 'Garden (20+)' },
    ],
  },
  {
    id: 'vibe',
    question: 'What vibe should it have?',
    options: [
      { value: 'elegant', label: 'Elegant & Refined' },
      { value: 'cute', label: 'Cute & Playful' },
      { value: 'wild', label: 'Wild & Free' },
      { value: 'mysterious', label: 'Mysterious & Dark' },
    ],
  },
  {
    id: 'wrap',
    question: 'Choose a wrapping style:',
    options: [
      { value: 'satin', label: 'Satin Ribbon \u{1F380}' },
      { value: 'twine', label: 'Rustic Twine' },
      { value: 'kraft', label: 'Kraft Paper' },
      { value: 'none', label: 'No Wrap' },
    ],
  },
  {
    id: 'extra',
    question: 'Add a special extra:',
    options: [
      { value: 'babys-breath', label: "Baby's Breath \u2728" },
      { value: 'eucalyptus', label: 'Eucalyptus Leaves \u{1F33F}' },
      { value: 'glitter', label: 'Glitter Dust \u{1F4AB}' },
      { value: 'butterflies', label: 'Butterflies \u{1F98B}' },
    ],
  },
  {
    id: 'message',
    question: 'Write a message for the bouquet tag:',
    type: 'text',
    placeholder: 'For you, always.',
    maxLength: 60,
  },
]

export default questions

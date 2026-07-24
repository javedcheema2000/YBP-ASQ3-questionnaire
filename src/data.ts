export type AnswerChoice = 'YES' | 'SOMETIMES' | 'NOT YET';
export type YesNoChoice = 'YES' | 'NO';

export interface Question {
  id: string;
  text: string;
  imageAlt?: string;
  imageUrl?: string;
  imagePosition?: 'right' | 'bottom';
  hasTextBox?: boolean;
  textBoxLabel?: string;
  multipleTextBoxes?: string[];
  inlineTextBoxes?: string[];
  checkboxes?: string[];
  footerText?: string;
}

export interface OverallQuestion {
  id: string;
  text: string;
  hasTextBox?: boolean;
  textBoxLabel?: string;
}

export interface MonthData {
  communication: Question[];
  grossMotor: Question[];
  fineMotor: Question[];
  problemSolving: Question[];
  personalSocial: Question[];
  overall: OverallQuestion[];
}



export const ASQ_DATA: Record<string, MonthData> = {
  '2': {
    communication: [
      { id: '2_c_1', text: 'Does your baby sometimes make throaty or gurgling sounds?' },
      { id: '2_c_2', text: 'Does your baby make cooing sounds such as "ooo," "gah," and "aah"?' },
      { id: '2_c_3', text: 'When you speak to your baby, does she make sounds back to you?' },
      { id: '2_c_4', text: 'Does your baby smile when you talk to him?' },
      { id: '2_c_5', text: 'Does your baby chuckle softly?' },
      { id: '2_c_6', text: 'After you have been out of sight, does your baby smile or get excited when she sees you?' }
    ],
    grossMotor: [
      { id: '2_gm_1', text: 'While your baby is on his back, does he wave his arms and legs, wiggle, and squirm?' },
      { id: '2_gm_2', text: 'When your baby is on her tummy, does she turn her head to the side?' },
      { id: '2_gm_3', text: 'When your baby is on his tummy, does he hold his head up longer than a few seconds?' },
      { id: '2_gm_4', text: 'When your baby is on her back, does she kick her legs?' },
      { id: '2_gm_5', text: 'While your baby is on his back, does he move his head from side to side?' },
      { id: '2_gm_6', text: 'After holding her head up while on her tummy, does your baby lay her head back down on the floor, rather than let it drop or fall forward?' }
    ],
    fineMotor: [
      { id: '2_fm_1', text: 'Is your baby\'s hand usually tightly closed when he is awake? <i>(If your baby used to do this but no longer does, mark "yes.")</i>' },
      { id: '2_fm_2', text: 'Does your baby grasp your finger if you touch the palm of her hand?', imageAlt: 'Baby grasping adult finger', imageUrl: '/images/2mo-fine-motor-q2.jpg' },
      { id: '2_fm_3', text: 'When you put a toy in his hand, does your baby hold it in his hand briefly?', imageAlt: 'Baby holding a ring toy', imageUrl: '/images/2mo-fine-motor-q3.jpg' },
      { id: '2_fm_4', text: 'Does your baby touch her face with her hands?', imageAlt: 'Baby touching face', imageUrl: '/images/2mo-fine-motor-q4.jpg' },
      { id: '2_fm_5', text: 'Does your baby hold his hands open or partly open when he is awake (rather than in fists, as they were when he was a newborn)?' },
      { id: '2_fm_6', text: 'Does your baby grab or scratch at her clothes?' }
    ],
    problemSolving: [
      { id: '2_ps_1', text: 'Does your baby look at objects that are 8-10 inches away?' },
      { id: '2_ps_2', text: 'When you move around, does your baby follow you with his eyes?' },
      { id: '2_ps_3', text: 'When you move a toy slowly from side to side in front of your baby\'s face (about 10 inches away), does your baby follow the toy with her eyes, sometimes turning her head?' },
      { id: '2_ps_4', text: 'When you move a small toy up and down slowly in front of your baby\'s face (about 10 inches away), does your baby follow the toy with his eyes?' },
      { id: '2_ps_5', text: 'When you hold your baby in a sitting position, does she look at a toy (about the size of a cup or rattle) that you place on the table or floor in front of her?' },
      { id: '2_ps_6', text: 'When you dangle a toy above your baby while he is lying on his back, does he wave his arms toward the toy?' }
    ],
    personalSocial: [
      { id: '2_pe_1', text: 'Does your baby sometimes try to suck, even when she\'s not feeding?' },
      { id: '2_pe_2', text: 'Does your baby cry when he is hungry, wet, tired, or wants to be held?' },
      { id: '2_pe_3', text: 'Does your baby smile at you?' },
      { id: '2_pe_4', text: 'When you smile at your baby, does she smile back?' },
      { id: '2_pe_5', text: 'Does your baby watch his hands?', imageAlt: 'Baby watching own hands', imageUrl: '/images/2mo-personal-social-q5.jpg' },
      { id: '2_pe_6', text: 'When your baby sees the breast or bottle, does she seem to know she is about to be fed?' }
    ],
    overall: [
      { id: '2_o_1', text: 'Did your baby pass the newborn hearing screening test? If no, explain:' },
      { id: '2_o_2', text: 'Does your baby move both hands and both legs equally well? If no, explain:' },
      { id: '2_o_3', text: 'Does either parent have a family history of childhood deafness, hearing impairment, or vision problems? If yes, explain:' },
      { id: '2_o_4', text: 'Has your baby had any medical problems? If yes, explain:' },
      { id: '2_o_5', text: 'Do you have concerns about your baby\'s behavior (for example, eating, sleeping)? If yes, explain:' },
      { id: '2_o_6', text: 'Does anything about your baby worry you? If yes, explain:' }
    ]
  },
  '6': {
    communication: [
      { id: '6_c_1', text: 'Does your baby make high-pitched squeals?' },
      { id: '6_c_2', text: 'When playing with sounds, does your baby make grunting, growling, or other deep-toned sounds?' },
      { id: '6_c_3', text: 'If you call your baby when you are out of sight, does she look in the direction of your voice?' },
      { id: '6_c_4', text: 'When a loud noise occurs, does your baby turn to see where the sound came from?' },
      { id: '6_c_5', text: 'Does your baby make sounds like "da," "ga," "ka," and "ba"?' },
      { id: '6_c_6', text: 'If you copy the sounds your baby makes, does your baby repeat the same sounds back to you?' }
    ],
    grossMotor: [
      { id: '6_gm_1', text: 'While your baby is on his back, does your baby lift his legs high enough to see his feet?' },
      { id: '6_gm_2', text: 'When your baby is on her tummy, does she straighten both arms and push her whole chest off the bed or floor?' },
      { id: '6_gm_3', text: 'Does your baby roll from his back to his tummy, getting both arms out from under him?' },
      { id: '6_gm_4', text: 'When you put your baby on the floor, does she lean on her hands while sitting? <i>(If she already sits up straight without leaning on her hands, mark "yes" for this item.)</i>', imageAlt: 'Baby sitting leaning on hands', imageUrl: '/images/6mo-gross-motor-q4.jpg' },
      { id: '6_gm_5', text: 'If you hold both hands just to balance your baby, does he support his own weight while standing?', imageAlt: 'Baby standing holding adult hands', imageUrl: '/images/6mo-gross-motor-q5.jpg' },
      { id: '6_gm_6', text: 'Does your baby get into a crawling position by getting up on her hands and knees?', imageAlt: 'Baby in crawling position', imageUrl: '/images/6mo-gross-motor-q6.jpg' }
    ],
    fineMotor: [
      { id: '6_fm_1', text: 'Does your baby grab a toy you offer and look at it, wave it about, or chew on it for about 1 minute?' },
      { id: '6_fm_2', text: 'Does your baby reach for or grasp a toy using both hands at once?' },
      { id: '6_fm_3', text: 'Does your baby reach for a crumb or Cheerio and touch it with his finger or hand? <i>(If he already picks up a small object the size of a pea, mark "yes" for this item.)</i>', imageAlt: 'Baby hand reaching for small crumb', imageUrl: '/images/6mo-fine-motor-q3.jpg' },
      { id: '6_fm_4', text: 'Does your baby pick up a small toy, holding it in the center of her hand with her fingers around it?', imageAlt: 'Baby grabbing a block', imageUrl: '/images/6mo-fine-motor-q4.jpg' },
      { id: '6_fm_5', text: 'Does your baby try to pick up a crumb or Cheerio by using his thumb and all of his fingers in a raking motion, even if he isn\'t able to pick it up? <i>(If he already picks up the crumb or Cheerio, mark "yes" for this item.)</i>', imageAlt: 'Baby using raking motion', imageUrl: '/images/6mo-fine-motor-q5.jpg' },
      { id: '6_fm_6', text: 'Does your baby pick up a small toy with only one hand?', imageAlt: 'Baby picking toy with one hand', imageUrl: '/images/6mo-fine-motor-q6.jpg' }
    ],
    problemSolving: [
      { id: '6_ps_1', text: 'When a toy is in front of your baby, does she reach for it with both hands?' },
      { id: '6_ps_2', text: 'When your baby is on his back, does he turn his head to look for a toy when he drops it? <i>(If he already picks it up, mark "yes" for this item.)</i>' },
      { id: '6_ps_3', text: 'When your baby is on her back, does she try to get a toy she has dropped if she can see it?' },
      { id: '6_ps_4', text: 'Does your baby pick up a toy and put it in his mouth?', imageAlt: 'Baby putting toy in mouth', imageUrl: '/images/6mo-prob-solving-q4.jpg' },
      { id: '6_ps_5', text: 'Does your baby pass a toy back and forth from one hand to the other?', imageAlt: 'Baby passing toy between hands', imageUrl: '/images/6mo-prob-solving-q5.jpg' },
      { id: '6_ps_6', text: 'Does your baby play by banging a toy up and down on the floor or table?', imageAlt: 'Baby banging block on table', imageUrl: '/images/6mo-prob-solving-q6.jpg' }
    ],
    personalSocial: [
      { id: '6_pe_1', text: 'When in front of a large mirror, does your baby smile or coo at herself?', imageAlt: 'Baby in front of mirror', imageUrl: '/images/6mo-personal-social-q1.jpg' },
      { id: '6_pe_2', text: 'Does your baby act differently toward strangers than he does with you and other familiar people? <i>(Reactions to strangers may include staring, frowning, withdrawing, or crying.)</i>' },
      { id: '6_pe_3', text: 'While lying on her back, does your baby play by grabbing her foot?', imageAlt: 'Baby on back grabbing foot', imageUrl: '/images/6mo-personal-social-q3.jpg' },
      { id: '6_pe_4', text: 'When in front of a large mirror, does your baby reach out to pat the mirror?', imageAlt: 'Baby patting mirror', imageUrl: '/images/6mo-personal-social-q4.jpg' },
      { id: '6_pe_5', text: 'While your baby is on his back, does he put his foot in his mouth?', imageAlt: 'Baby foot in mouth', imageUrl: '/images/6mo-personal-social-q5.jpg' },
      { id: '6_pe_6', text: 'Does your baby try to get a toy that is out of reach? <i>(She may roll, pivot on her tummy, or crawl to get it.)</i>' }
    ],
    overall: [
      { id: '6_o_1', text: 'Does your baby use both hands and both legs equally well? If no, explain:' },
      { id: '6_o_2', text: 'When you help your baby stand, are his feet flat on the surface most of the time? If no, explain:' },
      { id: '6_o_3', text: 'Do you have concerns that your baby is too quiet or does not make sounds like other babies? If yes, explain:' },
      { id: '6_o_4', text: 'Does either parent have a family history of childhood deafness or hearing impairment? If yes, explain:' },
      { id: '6_o_5', text: 'Do you have concerns about your baby\'s vision? If yes, explain:' },
      { id: '6_o_6', text: 'Has your baby had any medical problems in the last several months? If yes, explain:' },
      { id: '6_o_7', text: 'Do you have any concerns about your baby\'s behavior? If yes, explain:' },
      { id: '6_o_8', text: 'Does anything about your baby worry you? If yes, explain:' }
    ]
  },
  '9': {
    communication: [
      { id: '9_c_1', text: 'Does your baby make sounds like "da," "ga," "ka," and "ba"?' },
      { id: '9_c_2', text: 'If you copy the sounds your baby makes, does your baby repeat the same sounds back to you?' },
      { id: '9_c_3', text: 'Does your baby make two similar sounds like "ba-ba," "da-da," or "ga-ga"? <i>(The sounds do not need to mean anything.)</i>' },
      { id: '9_c_4', text: 'If you ask your baby to, does he play at least one nursery game even if you don\'t show him the activity yourself (such as "bye-bye," "Peekaboo," "clap your hands," "So Big")?' },
      { id: '9_c_5', text: 'Does your baby follow one simple command, such as "Come here," "Give it to me," or "Put it back," <b>without</b> your using gestures?' },
      { id: '9_c_6', text: 'Does your baby say three words, such as "Mama," "Dada," and "Baba"? <i>(A "word" is a sound or sounds your baby says consistently to mean someone or something.)</i>' }
    ],
    grossMotor: [
      { id: '9_gm_1', text: 'If you hold both hands just to balance your baby, does she support her own weight while standing?', imageAlt: 'Baby standing holding hands', imageUrl: '/images/9mo-gross-motor-q1.jpg' },
      { id: '9_gm_2', text: 'When sitting on the floor, does your baby sit up straight for several minutes <b>without</b> using his hands for support?', imageAlt: 'Baby sitting without support', imageUrl: '/images/9mo-gross-motor-q2.jpg' },
      { id: '9_gm_3', text: 'When you stand your baby next to furniture or the crib rail, does she hold on without leaning her chest against the furniture for support?', imageAlt: 'Baby standing next to furniture', imageUrl: '/images/9mo-gross-motor-q3.jpg' },
      { id: '9_gm_4', text: 'While holding onto furniture, does your baby bend down and pick up a toy from the floor and then return to a standing position?', imageAlt: 'Baby bending down holding furniture', imageUrl: '/images/9mo-gross-motor-q4.jpg' },
      { id: '9_gm_5', text: 'While holding onto furniture, does your baby lower himself with control (without falling or flopping down)?' },
      { id: '9_gm_6', text: 'Does your baby walk beside furniture while holding on with only one hand?' }
    ],
    fineMotor: [
      { id: '9_fm_1', text: 'Does your baby pick up a small toy with only one hand?', imageAlt: 'Baby picking up toy with one hand', imageUrl: '/images/9mo-fine-motor-q1.jpg' },
      { id: '9_fm_2', text: 'Does your baby <b>successfully</b> pick up a crumb or Cheerio by using her thumb and all of her fingers in a raking motion? <i>(If she already picks up a crumb or Cheerio, mark "yes" for this item.)</i>', imageAlt: 'Baby picking up crumb with raking motion', imageUrl: '/images/9mo-fine-motor-q2.jpg' },
      { id: '9_fm_3', text: 'Does your baby pick up a small toy with the <b>tips</b> of his thumb and fingers? <i>(You should see a space between the toy and his palm.)</i>', imageAlt: 'Baby picking up toy with tips of fingers', imageUrl: '/images/9mo-fine-motor-q3.jpg' },
      { id: '9_fm_4', text: 'After one or two tries, does your baby pick up a piece of string with her first finger and thumb? <i>(The string may be attached to a toy.)</i>', imageAlt: 'Baby picking up string', imageUrl: '/images/9mo-fine-motor-q4.jpg' },
      { id: '9_fm_5', text: 'Does your baby pick up a crumb or Cheerio with the <b>tips</b> of his thumb and a finger? He may rest his arm or hand on the table while doing it.', imageAlt: 'Baby picking up crumb with tips of thumb and finger', imageUrl: '/images/9mo-fine-motor-q5.jpg' },
      { id: '9_fm_6', text: 'Does your baby put a small toy down, without dropping it, and then take her hand off the toy?' }
    ],
    problemSolving: [
      { id: '9_ps_1', text: 'Does your baby pass a toy back and forth from one hand to the other?', imageAlt: 'Baby passing toy between hands', imageUrl: '/images/9mo-prob-solving-q1.jpg' },
      { id: '9_ps_2', text: 'Does your baby pick up two small toys, one in each hand, and hold onto them for about 1 minute?', imageAlt: 'Baby holding two toys', imageUrl: '/images/9mo-prob-solving-q2.jpg' },
      { id: '9_ps_3', text: 'When holding a toy in his hand, does your baby bang it against another toy on the table?', imageAlt: 'Baby banging toys together', imageUrl: '/images/9mo-prob-solving-q3.jpg' },
      { id: '9_ps_4', text: 'While holding a small toy in each hand, does your baby clap the toys together (like "Pat-a-cake")?' },
      { id: '9_ps_5', text: 'Does your baby poke at or try to get a crumb or Cheerio that is inside a clear bottle (such as a plastic soda-pop bottle or baby bottle)?' },
      { id: '9_ps_6', text: 'After watching you hide a small toy under a piece of paper or cloth, does your baby find it? <i>(Be sure the toy is completely hidden.)</i>' }
    ],
    personalSocial: [
      { id: '9_pe_1', text: 'While your baby is on her back, does she put her foot in her mouth?', imageAlt: 'Baby with foot in mouth', imageUrl: '/images/9mo-personal-social-q1.jpg' },
      { id: '9_pe_2', text: 'Does your baby drink water, juice, or formula from a cup while you hold it?' },
      { id: '9_pe_3', text: 'Does your baby feed himself a cracker or a cookie?' },
      { id: '9_pe_4', text: 'When you hold out your hand and ask for her toy, does your baby offer it to you even if she doesn\'t let go of it? <i>(If she already lets go of the toy into your hand, mark "yes" for this item.)</i>' },
      { id: '9_pe_5', text: 'When you dress your baby, does he push his arm through a sleeve once his arm is started in the hole of the sleeve?' },
      { id: '9_pe_6', text: 'When you hold out your hand and ask for her toy, does your baby let go of it into your hand?' }
    ],
    overall: [
      { id: '9_o_1', text: 'Does your baby use both hands and both legs equally well? If no, explain:' },
      { id: '9_o_2', text: 'When you help your baby stand, are his feet flat on the surface most of the time? If no, explain:' },
      { id: '9_o_3', text: 'Do you have concerns that your baby is too quiet or does not make sounds like other babies? If yes, explain:' },
      { id: '9_o_4', text: 'Does either parent have a family history of childhood deafness or hearing impairment? If yes, explain:' },
      { id: '9_o_5', text: 'Do you have concerns about your baby\'s vision? If yes, explain:' },
      { id: '9_o_6', text: 'Has your baby had any medical problems in the last several months? If yes, explain:' },
      { id: '9_o_7', text: 'Do you have any concerns about your baby\'s behavior? If yes, explain:' },
      { id: '9_o_8', text: 'Does anything about your baby worry you? If yes, explain:' }
    ]
  },
  '12': {
    communication: [
      { id: '12_c_1', text: 'Does your baby make two similar sounds, such as "ba-ba," "da-da," or "ga-ga"? <i>(The sounds do not need to mean anything.)</i>' },
      { id: '12_c_2', text: 'If you ask your baby to, does he play at least one nursery game even if you don\'t show him the activity yourself (such as "bye-bye," "Peekaboo," "clap your hands," "So Big")?' },
      { id: '12_c_3', text: 'Does your baby follow one simple command, such as "Come here," "Give it to me," or "Put it back," <b>without</b> your using gestures?' },
      { id: '12_c_4', text: 'Does your baby say three words, such as "Mama," "Dada," and "Baba"? <i>(A "word" is a sound or sounds your baby says consistently to mean someone or something.)</i>' },
      { id: '12_c_5', text: 'When you ask, "Where is the ball (hat, shoe, etc.)?" does your baby look at the object? <i>(Make sure the object is present. Mark "yes" if she knows one object.)</i>' },
      { id: '12_c_6', text: 'When your baby wants something, does he tell you by <b>pointing</b> to it?' }
    ],
    grossMotor: [
      { id: '12_gm_1', text: 'While holding onto furniture, does your baby bend down and pick up a toy from the floor and then return to a standing position?', imageAlt: 'Baby bending down while holding furniture', imageUrl: '/images/9mo-gross-motor-q4.jpg' },
      { id: '12_gm_2', text: 'While holding onto furniture, does your baby lower herself with control (without falling or flopping down)?' },
      { id: '12_gm_3', text: 'Does your baby walk beside furniture while holding on with only one hand?' },
      { id: '12_gm_4', text: 'If you hold both hands just to balance your baby, does he take several steps without tripping or falling? <i>(If your baby already walks alone, mark "yes" for this item.)</i>', imageAlt: 'Baby walking holding adult hands', imageUrl: '/images/12mo-gross-motor-q4.jpg' },
      { id: '12_gm_5', text: 'When you hold <b>one hand</b> just to balance your baby, does she take several steps forward? <i>(If your baby already walks alone, mark "yes" for this item.)</i>', imageAlt: 'Baby walking holding one adult hand', imageUrl: '/images/12mo-gross-motor-q5.jpg' },
      { id: '12_gm_6', text: 'Does your baby stand up in the middle of the floor by himself and take several steps forward?' }
    ],
    fineMotor: [
      { id: '12_fm_1', text: 'After one or two tries, does your baby pick up a piece of string with his first finger and thumb? <i>(The string may be attached to a toy.)</i>', imageAlt: 'Baby picking up string', imageUrl: '/images/12mo-fine-motor-q1.jpg' },
      { id: '12_fm_2', text: 'Does your baby pick up a crumb or Cheerio with the <b>tips</b> of her thumb and a finger? She may rest her arm or hand on the table while doing it.', imageAlt: 'Baby using pincer grasp resting hand', imageUrl: '/images/12mo-fine-motor-q2.jpg' },
      { id: '12_fm_3', text: 'Does your baby put a small toy down, without dropping it, and then take his hand off the toy?' },
      { id: '12_fm_4', text: 'Without resting her arm or hand on the table, does your baby pick up a crumb or Cheerio with the <b>tips</b> of her thumb and a finger?', imageAlt: 'Baby using pincer grasp mid-air', imageUrl: '/images/12mo-fine-motor-q4.jpg' },
      { id: '12_fm_5', text: 'Does your baby throw a small ball with a forward arm motion? <i>(If he simply drops the ball, mark "not yet" for this item.)</i>', imageAlt: 'Baby throwing a ball', imageUrl: '/images/12mo-fine-motor-q5.jpg' },
      { id: '12_fm_6', text: 'Does your baby help turn the pages of a book? <i>(You may lift a page for him to grasp.)</i>' }
    ],
    problemSolving: [
      { id: '12_ps_1', text: 'When holding a small toy in each hand, does your baby clap the toys together (like "Pat-a-cake")?' },
      { id: '12_ps_2', text: 'Does your baby poke at or try to get a crumb or Cheerio that is inside a clear bottle (such as a plastic soda-pop bottle or baby bottle)?' },
      { id: '12_ps_3', text: 'After watching you hide a small toy under a piece of paper or cloth, does your baby find it? <i>(Be sure the toy is completely hidden.)</i>' },
      { id: '12_ps_4', text: 'If you put a small toy into a bowl or box, does your baby copy you by putting in a toy, although she may not let go of it? <i>(If she already lets go of the toy into a bowl or box, mark "yes" for this item.)</i>' },
      { id: '12_ps_5', text: 'Does your baby drop two small toys, one after the other, into a container like a bowl or box? <i>(You may show him how to do it.)</i>', imageAlt: 'Baby dropping toys in a box', imageUrl: '/images/12mo-prob-solving-q5.jpg' },
      { id: '12_ps_6', text: 'After you scribble back and forth on paper with a crayon (or a pencil or pen), does your baby copy you by scribbling? <i>(If she already scribbles on her own, mark "yes" for this item.)</i>' }
    ],
    personalSocial: [
      { id: '12_pe_1', text: 'When you hold out your hand and ask for his toy, does your baby offer it to you even if he doesn\'t let go of it? <i>(If he already lets go of the toy into your hand, mark "yes" for this item.)</i>' },
      { id: '12_pe_2', text: 'When you dress your baby, does she push her arm through a sleeve once her arm is started in the hole of the sleeve?' },
      { id: '12_pe_3', text: 'When you hold out your hand and ask for his toy, does your baby let go of it into your hand?' },
      { id: '12_pe_4', text: 'When you dress your baby, does she lift her foot for her shoe, sock, or pant leg?' },
      { id: '12_pe_5', text: 'Does your baby roll or throw a ball back to you so that you can return it to him?' },
      { id: '12_pe_6', text: 'Does your baby play with a doll or stuffed animal by hugging it?' }
    ],
    overall: [
      { id: '12_o_1', text: 'Does your baby use both hands and both legs equally well? If no, explain:' },
      { id: '12_o_2', text: 'Does your baby play with sounds or seem to make words? If no, explain:' },
      { id: '12_o_3', text: 'When your baby is standing, are her feet flat on the surface most of the time? If no, explain:' },
      { id: '12_o_4', text: 'Do you have concerns that your baby is too quiet or does not make sounds like other babies? If yes, explain:' },
      { id: '12_o_5', text: 'Does either parent have a family history of childhood deafness or hearing impairment? If yes, explain:' },
      { id: '12_o_6', text: 'Do you have concerns about your baby\'s vision? If yes, explain:' },
      { id: '12_o_7', text: 'Has your baby had any medical problems in the last several months? If yes, explain:' },
      { id: '12_o_8', text: 'Do you have any concerns about your baby\'s behavior? If yes, explain:' },
      { id: '12_o_9', text: 'Does anything about your baby worry you? If yes, explain:' }
    ]
  },
  '18': {
    communication: [
      { id: '18_c_1', text: 'When your child wants something, does she tell you by <b>pointing</b> to it?' },
      { id: '18_c_2', text: 'When you ask your child to, does he go into another room to find a familiar toy or object? <i>(You might ask, "Where is your ball?" or say, "Bring me your coat," or "Go get your blanket.")</i>' },
      { id: '18_c_3', text: 'Does your child say eight or more words in addition to "Mama" and "Dada"?' },
      { id: '18_c_4', text: 'Does your child imitate a two-word sentence? For example, when you say a two-word phrase, such as "Mama eat," "Daddy play," "Go home," or "What\'s this?" does your child say both words back to you? <i>(Mark "yes" even if her words are difficult to understand.)</i>' },
      { id: '18_c_5', text: 'Without your showing him, does your child <b>point</b> to the correct picture when you say, "Show me the kitty," or ask, "Where is the dog?" <i>(He needs to identify only one picture correctly.)</i>' },
      { id: '18_c_6', text: 'Does your child say two or three words that represent different ideas together, such as "See dog," "Mommy come home," or "Kitty gone"? <i>(Don\'t count word combinations that express one idea, such as "bye-bye," "all gone," "all right," and "What\'s that?")</i> Please give an example of your child\'s word combinations:', hasTextBox: true }
    ],
    grossMotor: [
      { id: '18_gm_1', text: 'Does your child bend over or squat to pick up an object from the floor and then stand up again without any support?' },
      { id: '18_gm_2', text: 'Does your child move around by walking, rather than by crawling on her hands and knees?' },
      { id: '18_gm_3', text: 'Does your child walk well and seldom fall?' },
      { id: '18_gm_4', text: 'Does your child climb on an object such as a chair to reach something he wants (for example, to get a toy on a counter or to "help" you in the kitchen)?' },
      { id: '18_gm_5', text: 'Does your child walk down stairs if you hold onto one of her hands? She may also hold onto the railing or wall. <i>(You can look for this at a store, on a playground, or at home.)</i>' },
      { id: '18_gm_6', text: 'When you show your child how to kick a large ball, does he try to kick the ball by moving his leg forward or by walking into it? <i>(If your child already kicks a ball, mark "yes" for this item.)</i>', imageAlt: 'Child kicking a ball', imageUrl: '/images/18mo-gross-motor-q6.jpg' }
    ],
    fineMotor: [
      { id: '18_fm_1', text: 'Does your child throw a small ball with a forward arm motion? <i>(If he simply drops the ball, mark "not yet" for this item.)</i>', imageAlt: 'Child throwing ball forward', imageUrl: '/images/18mo-fine-motor-q1.jpg' },
      { id: '18_fm_2', text: 'Does your child stack a small block or toy on top of another one? <i>(You could also use spools of thread, small boxes, or toys that are about 1 inch in size.)</i>' },
      { id: '18_fm_3', text: 'Does your child make a mark on the paper with the <b>tip</b> of a crayon (or pencil or pen) when trying to draw?', imageAlt: 'Child drawing with the tip of a crayon', imageUrl: '/images/18mo-fine-motor-q3.jpg' },
      { id: '18_fm_4', text: 'Does your child stack three small blocks or toys on top of each other by himself?' },
      { id: '18_fm_5', text: 'Does your child turn the pages of a book by himself? <i>(He may turn more than one page at a time.)</i>' },
      { id: '18_fm_6', text: 'Does your child get a spoon into her mouth right side up so that the food usually doesn\'t spill?' }
    ],
    problemSolving: [
      { id: '18_ps_1', text: 'Does your child drop several small toys, one after another, into a container like a bowl or box? <i>(You may show him how to do it.)</i>' },
      { id: '18_ps_2', text: 'After you have shown your child how, does she try to get a small toy that is slightly out of reach by using a spoon, stick, or similar tool?', imageAlt: 'Child reaching for toy using a stick tool', imageUrl: '/images/18mo-prob-solving-q2.jpg' },
      { id: '18_ps_3', text: 'After a crumb or Cheerio is dropped into a small, clear bottle, does your child turn the bottle over to dump it out? <i>(You may show him how.)</i> (You can use a soda-pop bottle or a baby bottle.)' },
      { id: '18_ps_4', text: 'Without your showing her how, does your child scribble back and forth when you give her a crayon (or pencil or pen)?' },
      { id: '18_ps_5', text: 'After watching you draw a line from the top of the paper to the bottom with a crayon (or pencil or pen), does your child copy you by drawing a single line on the paper in <b>any direction</b>? <i>(Mark "not yet" if your child scribbles back and forth.)</i>', imageAlt: 'Child drawing a single line', imageUrl: '/images/18mo-prob-solving-q5.jpg' },
      { id: '18_ps_6', text: 'After a crumb or Cheerio is dropped into a small, clear bottle, does your child turn the bottle upside down to dump out the crumb or Cheerio? <i>(Do not show him how.)</i>' }
    ],
    personalSocial: [
      { id: '18_pe_1', text: 'While looking at herself in the mirror, does your child offer a toy to her own image?' },
      { id: '18_pe_2', text: 'Does your child play with a doll or stuffed animal by hugging it?' },
      { id: '18_pe_3', text: 'Does your child get your attention or try to show you something by pulling on your hand or clothes?' },
      { id: '18_pe_4', text: 'Does your child come to you when he needs help, such as with winding up a toy or unscrewing a lid from a jar?' },
      { id: '18_pe_5', text: 'Does your child drink from a cup or glass, putting it down again with little spilling?' },
      { id: '18_pe_6', text: 'Does your child copy the activities you do, such as wipe up a spill, sweep, shave, or comb hair?' }
    ],
    overall: [
      { id: '18_o_1', text: 'Do you think your child hears well? If no, explain:' },
      { id: '18_o_2', text: 'Do you think your child talks like other toddlers his age? If no, explain:' },
      { id: '18_o_3', text: 'Can you understand most of what your child says? If no, explain:' },
      { id: '18_o_4', text: 'Do you think your child walks, runs, and climbs like other toddlers her age? If no, explain:' },
      { id: '18_o_5', text: 'Does either parent have a family history of childhood deafness or hearing impairment? If yes, explain:' },
      { id: '18_o_6', text: 'Do you have concerns about your child\'s vision? If yes, explain:' },
      { id: '18_o_7', text: 'Has your child had any medical problems in the last several months? If yes, explain:' },
      { id: '18_o_8', text: 'Do you have any concerns about your child\'s behavior? If yes, explain:' },
      { id: '18_o_9', text: 'Does anything about your child worry you? If yes, explain:' }
    ]
  },
  '24': {
    communication: [
      { id: '24_c_1', text: 'Without your showing him, does your child point to the correct picture when you say, "Show me the kitty," or ask, "Where is the dog?" <i>(She needs to identify only one picture correctly.)</i>' },
      { id: '24_c_2', text: 'Does your child imitate a two-word sentence? For example, when you say a two-word phrase, such as "Mama eat," "Daddy play," "Go home," or "What\'s this?" does your child say both words back to you? <i>(Mark "yes" even if her words are difficult to understand.)</i>' },
      { id: '24_c_3', text: 'Without your giving him clues by pointing or using gestures, can your child carry out at least three of these kinds of directions?<ul><li>a. "Put the toy on the table."</li><li>b. "Close the door."</li><li>c. "Bring me a towel."</li><li>d. "Find your coat."</li><li>e. "Take my hand."</li><li>f. "Get your book."</li></ul>' },
      { id: '24_c_4', text: 'If you point to a picture of a ball (kitty, cup, hat, etc.) and ask your child, "What is this?" does your child correctly name at least one picture?' },
      { id: '24_c_5', text: 'Does your child say two or three words that represent different ideas together, such as "See dog," "Mommy come home," or "Kitty gone"? <i>(Don\'t count word combinations that express one idea, such as "bye-bye," "all gone," "all right," and "What\'s that?")</i>', hasTextBox: true, textBoxLabel: 'Please give an example of your child\'s word combinations:' },
      { id: '24_c_6', text: 'Does your child correctly use at least two words like "me," "I," "mine," and "you"?' }
    ],
    grossMotor: [
      { id: '24_gm_1', text: 'Does your child walk down stairs if you hold onto one of her hands? She may also hold onto the railing or wall. <i>(You can look for this at a store, on a playground, or at home.)</i>' },
      { id: '24_gm_2', text: 'When you show your child how to kick a large ball, does he try to kick the ball by moving his leg forward or by walking into it? <i>(If your child already kicks a ball, mark "yes" for this item.)</i>', imageAlt: 'Child kicking a ball', imageUrl: '/images/24mo-gross-motor-q2.jpg' },
      { id: '24_gm_3', text: 'Does your child walk either up or down at least two steps by herself? She may hold onto the railing or wall.', imageAlt: 'Child walking up stairs', imageUrl: '/images/24mo-gross-motor-q3.jpg' },
      { id: '24_gm_4', text: 'Does your child run fairly well, stopping herself without bumping into things or falling?', imageAlt: 'Child running', imageUrl: '/images/24mo-gross-motor-q4.jpg' },
      { id: '24_gm_5', text: 'Does your child jump with both feet leaving the floor at the same time?', imageAlt: 'Child jumping', imageUrl: '/images/24mo-gross-motor-q5.jpg' },
      { id: '24_gm_6', text: 'Without holding onto anything for support, does your child kick a ball by swinging his leg forward?', imageAlt: 'Child kicking ball without support', imageUrl: '/images/24mo-gross-motor-q6.jpg' }
    ],
    fineMotor: [
      { id: '24_fm_1', text: 'Does your child get a spoon into his mouth right side up so that the food usually doesn\'t spill?' },
      { id: '24_fm_2', text: 'Does your child turn the pages of a book by herself? <i>(She may turn more than one page at a time.)</i>' },
      { id: '24_fm_3', text: 'Does your child use a turning motion with her hand while trying to turn doorknobs, wind up toys, twist tops, or screw lids on and off jars?' },
      { id: '24_fm_4', text: 'Does your child flip switches off and on?' },
      { id: '24_fm_5', text: 'Does your child stack seven small blocks or toys on top of each other by herself? <i>(You could also use spools of thread, small boxes, or toys that are about 1 inch in size.)</i>' },
      { id: '24_fm_6', text: 'Can your child string small items such as beads, macaroni, or pasta "wagon wheels" onto a string or shoelace?', imageAlt: 'Child stringing items', imageUrl: '/images/24mo-fine-motor-q6.jpg' }
    ],
    problemSolving: [
      { id: '24_ps_1', text: 'After watching you draw a line from the top of the paper to the bottom with a crayon (or pencil or pen), does your child copy you by drawing a single line on the paper in <b>any direction</b>? <i>(Mark "not yet" if your child scribbles back and forth.)</i>', imageAlt: 'Child drawing a single line', imageUrl: '/images/24mo-prob-solving-q1.jpg' },
      { id: '24_ps_2', text: 'After a crumb or Cheerio is dropped into a small, clear bottle, does your child turn the bottle upside down to dump out the crumb or Cheerio? <i>(Do not show him how.)</i> (You can use a soda-pop bottle or baby bottle.)' },
      { id: '24_ps_3', text: 'Does your child pretend objects are something else? For example, does your child hold a cup to her ear, pretending it is a telephone? Does she put a box on her head, pretending it is a hat? Does she use a block or small toy to stir food?' },
      { id: '24_ps_4', text: 'Does your child put things away where they belong? For example, does he know his toys belong on the toy shelf, his blanket goes on his bed, and dishes go in the kitchen?' },
      { id: '24_ps_5', text: 'If your child wants something she cannot reach, does she find a chair or box to stand on to reach it (for example, to get a toy on a counter or to "help" you in the kitchen)?' },
      { id: '24_ps_6', text: 'While your child watches, line up four objects like blocks or cars in a row. Does your child copy or imitate you and line up four objects in a row? <i>(You can also use spools of thread, small boxes, or other toys.)</i>', imageAlt: 'Child lining up blocks', imageUrl: '/images/24mo-prob-solving-q6.jpg' }
    ],
    personalSocial: [
      { id: '24_pe_1', text: 'Does your child drink from a cup or glass, putting it down again with little spilling?' },
      { id: '24_pe_2', text: 'Does your child copy the activities you do, such as wipe up a spill, sweep, shave, or comb hair?' },
      { id: '24_pe_3', text: 'Does your child eat with a fork?' },
      { id: '24_pe_4', text: 'When playing with either a stuffed animal or a doll, does your child pretend to rock it, feed it, change its diapers, put it to bed, and so forth?' },
      { id: '24_pe_5', text: 'Does your child push a little wagon, stroller, or other toy on wheels, steering it around objects and backing out of corners if he cannot turn?' },
      { id: '24_pe_6', text: 'Does your child call herself "I" or "me" more often than her own name? For example, "I do it," more often than "Juanita do it."' }
    ],
    overall: [
      { id: '24_o_1', text: 'Do you think your child hears well? If no, explain:' },
      { id: '24_o_2', text: 'Do you think your child talks like other toddlers her age? If no, explain:' },
      { id: '24_o_3', text: 'Can you understand most of what your child says? If no, explain:' },
      { id: '24_o_4', text: 'Do you think your child walks, runs, and climbs like other toddlers his age? If no, explain:' },
      { id: '24_o_5', text: 'Does either parent have a family history of childhood deafness or hearing impairment? If yes, explain:' },
      { id: '24_o_6', text: 'Do you have any concerns about your child\'s vision? If yes, explain:' },
      { id: '24_o_7', text: 'Has your child had any medical problems in the last several months? If yes, explain:' },
      { id: '24_o_8', text: 'Do you have any concerns about your child\'s behavior? If yes, explain:' },
      { id: '24_o_9', text: 'Does anything about your child worry you? If yes, explain:' }
    ]
  },
  '30': {
    communication: [
      { id: '30_c_1', text: 'If you point to a picture of a ball (kitty, cup, hat, etc.) and ask your child, "What is this?" does your child correctly name at least one picture?' },
      { id: '30_c_2', text: 'Without your giving him clues by pointing or using gestures, can your child carry out at least three of these kinds of directions?', checkboxes: ['a. "Put the toy on the table."', 'b. "Close the door."', 'c. "Bring me a towel."', 'd. "Find your coat."', 'e. "Take my hand."', 'f. "Get your book."'] },
      { id: '30_c_3', text: 'When you ask your child to point to her nose, eyes, hair, feet, ears, and so forth, does she correctly point to at least seven body parts? <i>(She can point to parts of herself, you, or a doll. Mark "sometimes" if she correctly points to at least three different body parts.)</i>' },
      { id: '30_c_4', text: 'Does your child make sentences that are three or four words long?', hasTextBox: true, textBoxLabel: 'Please give an example:' },
      { id: '30_c_5', text: 'Without giving your child help by pointing or using gestures, ask him to "put the book <b>on</b> the table" and "put the shoe <b>under</b> the chair." Does your child carry out both of these directions correctly?' },
      { id: '30_c_6', text: 'When looking at a picture book, does your child tell you what is happening or what action is taking place in the picture (for example, "barking," "running," "eating," or "crying")? You may ask, "What is the dog (or boy) doing?"' }
    ],
    grossMotor: [
      { id: '30_gm_1', text: 'Does your child run fairly well, stopping herself without bumping into things or falling?', imageAlt: 'Child running', imageUrl: '/images/30mo-gross-motor-q1.jpg' },
      { id: '30_gm_2', text: 'Does your child walk either up or down at least two steps by himself? He may hold onto the railing or wall. <i>(You can look for this at a store, on a playground, or at home.)</i>', imageAlt: 'Child walking up stairs', imageUrl: '/images/30mo-gross-motor-q2.jpg' },
      { id: '30_gm_3', text: 'Without holding onto anything for support, does your child kick a ball by swinging his leg forward?', imageAlt: 'Child kicking ball', imageUrl: '/images/30mo-gross-motor-q3.jpg' },
      { id: '30_gm_4', text: 'Does your child jump with both feet leaving the floor at the same time?', imageAlt: 'Child jumping', imageUrl: '/images/30mo-gross-motor-q4.jpg' },
      { id: '30_gm_5', text: 'Does your child walk up stairs, using only one foot on each stair? <i>(The left foot is on one step, and the right foot is on the next.)</i> She may hold onto the railing or wall.', imageAlt: 'Child walking up stairs using alternating feet', imageUrl: '/images/30mo-gross-motor-q5.jpg' },
      { id: '30_gm_6', text: 'Does your child stand on one foot for about 1 second without holding onto anything?', imageAlt: 'Child standing on one foot', imageUrl: '/images/30mo-gross-motor-q6.jpg' }
    ],
    fineMotor: [
      { id: '30_fm_1', text: 'Does your child use a turning motion with her hand while trying to turn doorknobs, wind up toys, twist tops, or screw lids on and off jars?' },
      { id: '30_fm_2', text: 'After your child watches you draw a line from the top of the paper to the bottom with a pencil, crayon, or pen, ask him to make a line like yours. Do not let your child trace your line. Does your child copy you by drawing a single line in a vertical direction?', imageAlt: 'Child drawing vertical line', imageUrl: '/images/30mo-fine-motor-q2.jpg' },
      { id: '30_fm_3', text: 'Can your child string small items such as beads, macaroni, or pasta "wagon wheels" onto a string or shoelace?', imageAlt: 'Child stringing items', imageUrl: '/images/30mo-fine-motor-q3.jpg' },
      { id: '30_fm_4', text: 'After your child watches you draw a line from one side of the paper to the other side, ask her to make a line like yours. Do not let your child trace your line. Does your child copy you by drawing a single line in a horizontal direction?', imageAlt: 'Child drawing horizontal line', imageUrl: '/images/30mo-fine-motor-q4.jpg' },
      { id: '30_fm_5', text: 'After your child watches you draw a single circle, ask him to make a circle like yours. Do not let him trace your circle. Does your child copy you by drawing a circle?', imageAlt: 'Child drawing a circle', imageUrl: '/images/30mo-fine-motor-q5.jpg' },
      { id: '30_fm_6', text: 'Does your child turn pages in a book, one page at a time?' }
    ],
    problemSolving: [
      { id: '30_ps_1', text: 'When looking in the mirror, ask, "Where is _____?" <i>(Use your child\'s name.)</i> Does your child point to her image in the mirror?', imageAlt: 'Child pointing in mirror', imageUrl: '/images/30mo-prob-solving-q1.jpg' },
      { id: '30_ps_2', text: 'If your child wants something he cannot reach, does he find a chair or box to stand on to reach it (for example, to get a toy on a counter or to "help" you in the kitchen)?' },
      { id: '30_ps_3', text: 'While your child watches, line up four objects like blocks or cars in a row. Does your child copy or imitate you and line up four objects in a row? <i>(You can also use spools of thread, small boxes, or other toys.)</i>', imageAlt: 'Child lining up blocks', imageUrl: '/images/30mo-prob-solving-q3.jpg' },
      { id: '30_ps_4', text: 'When you point to the figure and ask your child, "What is this?" does your child say a word that means a person or something similar? <i>(Mark "yes" for responses like "snowman," "boy," "man," "girl," "Daddy," "spaceman," and "monkey.")</i> Please write your child\'s response here:', imageAlt: 'Stick figure', imageUrl: '/images/30mo-prob-solving-q4.jpg' },
      { id: '30_ps_5', text: 'When you say, "Say \'seven three,\'" does your child repeat just the two numbers in the same order? Do not repeat the numbers. If necessary, try another pair of numbers and say, "Say \'eight two.\'" Your child must repeat just one series of two numbers for you to answer "yes" to this question.' },
      { id: '30_ps_6', text: 'After your child draws a "picture," even a simple scribble, does she tell you what she drew? <i>(You may say, "Tell me about your picture," or ask, "What is this?" to prompt her.)</i>' }
    ],
    personalSocial: [
      { id: '30_pe_1', text: 'If you do any of the following gestures, does your child copy at least one of them?<ul><li>a. Open and close your mouth.</li><li>b. Blink your eyes.</li><li>c. Pull on your earlobe.</li><li>d. Pat your cheek.</li></ul>' },
      { id: '30_pe_2', text: 'Does your child use a spoon to feed himself with little spilling?' },
      { id: '30_pe_3', text: 'Does your child push a little wagon, stroller, or other toy on wheels, steering it around objects and backing out of corners if she cannot turn?' },
      { id: '30_pe_4', text: 'Does your child put on a coat, jacket, or shirt by himself?' },
      { id: '30_pe_5', text: 'After you put on loose-fitting pants around her feet, does your child pull them completely up to her waist?' },
      { id: '30_pe_6', text: 'When your child is looking in a mirror and you ask, "Who is in the mirror?" does he say either "me" or his own name?' }
    ],
    overall: [
      { id: '30_o_1', text: 'Do you think your child hears well? If no, explain:', hasTextBox: true },
      { id: '30_o_2', text: 'Do you think your child talks like other toddlers her age? If no, explain:', hasTextBox: true },
      { id: '30_o_3', text: 'Can you understand most of what your child says? If no, explain:', hasTextBox: true },
      { id: '30_o_4', text: 'Can other people understand most of what your child says? If no, explain:', hasTextBox: true },
      { id: '30_o_5', text: 'Do you think your child walks, runs, and climbs like other toddlers his age? If no, explain:', hasTextBox: true },
      { id: '30_o_6', text: 'Does either parent have a family history of childhood deafness or hearing impairment? If yes, explain:', hasTextBox: true },
      { id: '30_o_7', text: 'Do you have any concerns about your child\'s vision? If yes, explain:', hasTextBox: true },
      { id: '30_o_8', text: 'Has your child had any medical problems in the last several months? If yes, explain:', hasTextBox: true },
      { id: '30_o_9', text: 'Do you have any concerns about your child\'s behavior? If yes, explain:', hasTextBox: true },
      { id: '30_o_10', text: 'Does anything about your child worry you? If yes, explain:', hasTextBox: true }
    ]
  },
  '36': {
    communication: [
      { id: '36_c_1', text: 'When you ask your child to point to her nose, eyes, hair, feet, ears, and so forth, does she correctly point to at least seven body parts? <i>(She can point to parts of herself, you, or a doll. Mark "sometimes" if she correctly points to at least three different body parts.)</i>' },
      { id: '36_c_2', text: 'Does your child make sentences that are three or four words long?', hasTextBox: true, textBoxLabel: 'Please give an example:' },
      { id: '36_c_3', text: 'Without giving your child help by pointing or using gestures, ask him to "put the book <b>on</b> the table" and "put the shoe <b>under</b> the chair." Does your child carry out both of these directions correctly?' },
      { id: '36_c_4', text: 'When looking at a picture book, does your child tell you what is happening or what action is taking place in the picture (for example, "barking," "running," "eating," or "crying")? You may ask, "What is the dog (or boy) doing?"' },
      { id: '36_c_5', text: 'Show your child how a zipper on a coat moves up and down, and say, "See, this goes up and down." Put the zipper to the middle and ask your child to move the zipper down. Return the zipper to the middle and ask your child to move the zipper up. Do this several times, placing the zipper in the middle before asking your child to move it up or down. Does your child consistently move the zipper up when you say "up" and down when you say "down"?' },
      { id: '36_c_6', text: 'When you ask, "What is your name?" does your child say both her first and last names?' }
    ],
    grossMotor: [
      { id: '36_gm_1', text: 'Without holding onto anything for support, does your child kick a ball by swinging his leg forward?', imageAlt: 'Child kicking ball', imageUrl: '/images/36mo-gross-motor-q1.jpg' },
      { id: '36_gm_2', text: 'Does your child jump with both feet leaving the floor at the same time?', imageAlt: 'Child jumping', imageUrl: '/images/36mo-gross-motor-q2.jpg' },
      { id: '36_gm_3', text: 'Does your child walk up stairs, using only one foot on each stair? <i>(The left foot is on one step, and the right foot is on the next.)</i> She may hold onto the railing or wall. <i>(You can look for this at a store, on a playground, or at home.)</i>', imageAlt: 'Child walking up stairs using alternating feet', imageUrl: '/images/36mo-gross-motor-q3.jpg' },
      { id: '36_gm_4', text: 'Does your child stand on one foot for about 1 second without holding onto anything?', imageAlt: 'Child standing on one foot', imageUrl: '/images/36mo-gross-motor-q4.jpg' },
      { id: '36_gm_5', text: 'While standing, does your child throw a ball overhand by raising his arm to shoulder height and throwing the ball forward? <i>(Dropping the ball or throwing the ball underhand should be scored as "not yet.")</i>', imageAlt: 'Child throwing ball overhand', imageUrl: '/images/36mo-gross-motor-q5.jpg' },
      { id: '36_gm_6', text: 'Does your child jump forward at least 6 inches with both feet leaving the ground at the same time?', imageAlt: 'Child jumping forward', imageUrl: '/images/36mo-gross-motor-q6.jpg' }
    ],
    fineMotor: [
      { id: '36_fm_1', text: 'After your child watches you draw a line from the top of the paper to the bottom with a pencil, crayon, or pen, ask her to make a line like yours. Do not let your child trace your line. Does your child copy you by drawing a single line in a vertical direction?', imageAlt: 'Child drawing vertical line', imageUrl: '/images/36mo-fine-motor-q1.jpg' },
      { id: '36_fm_2', text: 'Can your child string small items such as beads, macaroni, or pasta "wagon wheels" onto a string or shoelace?', imageAlt: 'Child stringing items', imageUrl: '/images/36mo-fine-motor-q2.jpg' },
      { id: '36_fm_3', text: 'After your child watches you draw a single circle, ask him to make a circle like yours. Do not let him trace your circle. Does your child copy you by drawing a circle?', imageAlt: 'Child drawing a circle', imageUrl: '/images/36mo-fine-motor-q3.jpg' },
      { id: '36_fm_4', text: 'After your child watches you draw a line from one side of the paper to the other side, ask her to make a line like yours. Do not let your child trace your line. Does your child copy you by drawing a single line in a horizontal direction?', imageAlt: 'Child drawing horizontal line', imageUrl: '/images/36mo-fine-motor-q4.jpg' },
      { id: '36_fm_5', text: 'Does your child try to cut paper with child-safe scissors? He does not need to cut the paper but must get the blades to open and close while holding the paper with the other hand. <i>(You may show your child how to use scissors. Carefully watch your child\'s use of scissors for safety reasons.)</i>', imageAlt: 'Child trying to cut with scissors', imageUrl: '/images/36mo-fine-motor-q5.jpg' },
      { id: '36_fm_6', text: 'When drawing, does your child hold a pencil, crayon, or pen between her fingers and thumb like an adult does?' }
    ],
    problemSolving: [
      { id: '36_ps_1', text: 'While your child watches, line up four objects like blocks or cars in a row. Does your child copy or imitate you and line up <b>four</b> objects in a row? <i>(You can also use spools of thread, small boxes, or other toys.)</i>', imageAlt: 'Child lining up blocks', imageUrl: '/images/36mo-prob-solving-q1.jpg' },
      { id: '36_ps_2', text: 'If your child wants something he cannot reach, does he find a chair or box to stand on to reach it (for example, to get a toy on a counter or to "help" you in the kitchen)?' },
      { id: '36_ps_3', text: 'When you point to the figure and ask your child, "What is this?" does your child say a word that means a person or something similar? <i>(Mark "yes" for responses like "snowman," "boy," "man," "girl," "Daddy," "spaceman," and "monkey.")</i>', hasTextBox: true, textBoxLabel: 'Please write your child\'s response here:', imageAlt: 'Stick figure', imageUrl: '/images/36mo-prob-solving-q3.jpg' },
      { id: '36_ps_4', text: 'When you say, "Say \'seven three,\'" does your child repeat just the two numbers in the same order? Do not repeat the numbers. If necessary, try another pair of numbers and say, "Say \'eight two.\'" Your child must repeat just one series of two numbers for you to answer "yes" to this question.' },
      { id: '36_ps_5', text: 'Show your child how to make a bridge with blocks, boxes, or cans, like the example. Does your child copy you by making one like it?', imageAlt: 'Child building a bridge with blocks', imageUrl: '/images/36mo-prob-solving-q5.jpg' },
      { id: '36_ps_6', text: 'When you say, "Say \'five eight three,\'" does your child repeat just the three numbers in the same order? Do not repeat the numbers. If necessary, try another series of numbers and say, "Say \'six nine two.\'" <i>(Your child must repeat just one series of three numbers for you to answer "yes" to this question.)</i>' }
    ],
    personalSocial: [
      { id: '36_pe_1', text: 'Does your child use a spoon to feed herself with little spilling?' },
      { id: '36_pe_2', text: 'Does your child push a little wagon, stroller, or toy on wheels, steering it around objects and backing out of corners if he cannot turn?' },
      { id: '36_pe_3', text: 'When your child is looking in a mirror and you ask, "Who is in the mirror?" does she say either "me" or her own name?' },
      { id: '36_pe_4', text: 'Does your child put on a coat, jacket, or shirt by himself?' },
      { id: '36_pe_5', text: 'Using these exact words, ask your child, "Are you a girl or a boy?" Does your child answer correctly?' },
      { id: '36_pe_6', text: 'Does your child take turns by waiting while another child or adult takes a turn?' }
    ],
    overall: [
      { id: '36_o_1', text: 'Do you think your child hears well? If no, explain:', hasTextBox: true },
      { id: '36_o_2', text: 'Do you think your child talks like other children her age? If no, explain:', hasTextBox: true },
      { id: '36_o_3', text: 'Can you understand most of what your child says? If no, explain:', hasTextBox: true },
      { id: '36_o_4', text: 'Can other people understand most of what your child says? If no, explain:', hasTextBox: true },
      { id: '36_o_5', text: 'Do you think your child walks, runs, and climbs like other children his age? If no, explain:', hasTextBox: true },
      { id: '36_o_6', text: 'Does either parent have a family history of childhood deafness or hearing impairment? If yes, explain:', hasTextBox: true },
      { id: '36_o_7', text: 'Do you have any concerns about your child\'s vision? If yes, explain:', hasTextBox: true },
      { id: '36_o_8', text: 'Has your child had any medical problems in the last several months? If yes, explain:', hasTextBox: true },
      { id: '36_o_9', text: 'Do you have any concerns about your child\'s behavior? If yes, explain:', hasTextBox: true },
      { id: '36_o_10', text: 'Does anything about your child worry you? If yes, explain:', hasTextBox: true }
    ]
  }
,
  '42': {
    communication: [
      { id: '42_c_1', text: 'Without giving your child help by pointing or using gestures, ask him to "put the book <b>on</b> the table" and "put the shoe <b>under</b> the chair." Does your child carry out both of these directions correctly?' },
      { id: '42_c_2', text: 'When looking at a picture book, does your child tell you what is happening or what action is taking place in the picture (for example, "barking," "running," "eating," or "crying")? You may ask, "What is the dog (or boy) doing?"' },
      { id: '42_c_3', text: 'Show your child how a zipper on a coat moves up and down, and say, "See, this goes up and down." Put the zipper to the middle, and ask your child to move the zipper <b>down</b>. Return the zipper to the middle, and ask your child to move the zipper <b>up</b>. Do this several times, placing the zipper in the middle before asking your child to move it up or down. Does your child consistently move the zipper up when you say "up" and down when you say "down"?' },
      { id: '42_c_4', text: 'When you ask, "What is your name?" does your child say both her first and last names?' },
      { id: '42_c_5', text: 'Without your giving help by pointing or repeating directions, does your child follow three directions that are <i>unrelated</i> to one another? Give all three directions before your child starts. For example, you may ask your child, "Clap your hands, walk to the door, and sit down," or "Give me the pen, open the book, and stand up."' },
      { id: '42_c_6', text: 'Does your child use all of the words in a sentence (for example, "a," "the," "am," "is," and "are") to make complete sentences, such as "I am going to the park," or "Is there a toy to play with?" or "Are you coming, too?"' }
    ],
    grossMotor: [
      { id: '42_gm_1', text: 'Does your child walk up stairs, using only one foot on each stair? <i>(The left foot is on one step, and the right foot is on the next.)</i> He may hold onto the railing or wall. <i>(You can look for this at a store, on a playground, or at home.)</i>', imageAlt: 'Child walking up stairs using alternating feet', imageUrl: '/images/42mo-gross-motor-q1.jpg' },
      { id: '42_gm_2', text: 'Does your child stand on one foot for about 1 second without holding onto anything?', imageAlt: 'Child standing on one foot', imageUrl: '/images/42mo-gross-motor-q2.jpg' },
      { id: '42_gm_3', text: 'While standing, does your child throw a ball <i>overhand</i> by raising his arm to shoulder height and throwing the ball forward? <i>(Dropping the ball or throwing the ball underhand should be scored as "not yet.")</i>', imageAlt: 'Child throwing ball overhand', imageUrl: '/images/42mo-gross-motor-q3.jpg' },
      { id: '42_gm_4', text: 'Does your child jump forward at least 6 inches with both feet leaving the ground at the same time?', imageAlt: 'Child jumping forward', imageUrl: '/images/42mo-gross-motor-q4.jpg' },
      { id: '42_gm_5', text: 'Does your child catch a large ball with both hands? <i>(You should stand about 5 feet away and give your child two or three tries before you mark the answer.)</i>', imageAlt: 'Child catching large ball', imageUrl: '/images/42mo-gross-motor-q5.jpg' },
      { id: '42_gm_6', text: 'Does your child climb the rungs of a ladder of a playground slide and slide down without help?' }
    ],
    fineMotor: [
      { id: '42_fm_1', text: 'After your child watches you draw a single circle with a pencil, crayon, or pen, ask him to make a circle like yours. Do not let him trace your circle. Does your child copy you by drawing a circle?', imageAlt: 'Child drawing a circle', imageUrl: '/images/42mo-fine-motor-q1.jpg' },
      { id: '42_fm_2', text: 'After your child watches you draw a line from one side of the paper to the other side, ask her to make a line like yours. Do not let your child trace your line. Does your child copy you by drawing a single line in a horizontal direction?', imageAlt: 'Child drawing horizontal line', imageUrl: '/images/42mo-fine-motor-q2.jpg' },
      { id: '42_fm_3', text: 'Does your child try to cut paper with child-safe scissors? He does not need to cut the paper but must get the blades to open and close while holding the paper with the other hand. <i>(You may show your child how to use scissors. Carefully watch your child\'s use of scissors for safety reasons.)</i>', imageAlt: 'Child trying to cut with scissors', imageUrl: '/images/42mo-fine-motor-q3.jpg' },
      { id: '42_fm_4', text: 'When drawing, does your child hold a pencil, crayon, or pen between her fingers and thumb like an adult does?', imageAlt: 'Child holding pencil correctly', imageUrl: '/images/42mo-fine-motor-q4.jpg' },
      { id: '42_fm_5', text: 'Does your child put together a five- to seven-piece interlocking puzzle? <i>(If one is not available, take a full-page picture from a magazine or catalog and cut it into six pieces. Does your child put it back together correctly?)</i>' },
      { id: '42_fm_6', text: 'Using the shape at right to look at, does your child copy it onto a large piece of paper using a pencil, crayon, or pen, without tracing? <i>(Your child\'s drawing should look like the design of the shape, except it may be different in size.)</i>', imageAlt: 'Cross shape', imageUrl: '/images/42mo-fine-motor-q6.jpg' }
    ],
    problemSolving: [
      { id: '42_ps_1', text: 'When you point to the figure and ask your child, "What is this?" does your child say a word that means a person or something similar? <i>(Mark "yes" for responses like "snowman," "boy," "man," "girl," "Daddy," "spaceman," and "monkey.")</i>', hasTextBox: true, textBoxLabel: 'Please write your child\'s response here:', imageAlt: 'Stick figure', imageUrl: '/images/42mo-prob-solving-q1.jpg' },
      { id: '42_ps_2', text: 'When you say, "Say \'seven three,\'" does your child repeat just the two numbers in the same order? Do not repeat the numbers. If necessary, try another pair of numbers and say, "Say \'eight two.\'" <i>(Your child must repeat just one series of two numbers for you to answer "yes" to this question.)</i>' },
      { id: '42_ps_3', text: 'Show your child how to make a bridge with blocks, boxes, or cans, like the example. Does your child copy you by making one like it?', imageAlt: 'Child building a bridge with blocks', imageUrl: '/images/42mo-prob-solving-q3.jpg' },
      { id: '42_ps_4', text: 'When you say, "Say \'five eight three,\'" does your child repeat just the three numbers in the same order? Do not repeat the numbers. If necessary, try another series of numbers and say, "Say \'six nine two.\'" <i>(Your child must repeat just one series of three numbers for you to answer "yes" to this question.)</i>' },
      { id: '42_ps_5', text: 'When asked, "Which circle is the smallest?" does your child point to the smallest circle? <i>(Ask this question without providing help by pointing, gesturing, or looking at the smallest circle.)</i>', imageAlt: 'Three circles of different sizes', imageUrl: '/images/42mo-prob-solving-q5.jpg' },
      { id: '42_ps_6', text: 'Does your child dress up and "play-act," pretending to be someone or something else? For example, your child may dress up in different clothes and pretend to be a mommy, daddy, brother or sister, or an imaginary animal or figure.' }
    ],
    personalSocial: [
      { id: '42_pe_1', text: 'When he is looking in a mirror and you ask, "Who is in the mirror?" does your child say either "me" or his own name?' },
      { id: '42_pe_2', text: 'Does your child put on a coat, jacket, or shirt by herself?' },
      { id: '42_pe_3', text: 'Using these exact words, ask your child, "Are you a girl or a boy?" Does your child answer correctly?' },
      { id: '42_pe_4', text: 'Does your child take turns by waiting while another child or adult takes a turn?' },
      { id: '42_pe_5', text: 'Does your child serve himself, taking food from one container to another using utensils? For example, does your child use a large spoon to scoop applesauce from a jar into a bowl?' },
      { id: '42_pe_6', text: 'Does your child wash his hands using soap and water and dry off with a towel without help?' }
    ],
    overall: [
      { id: '42_o_1', text: 'Do you think your child hears well? If no, explain:', hasTextBox: true },
      { id: '42_o_2', text: 'Do you think your child talks like other children her age? If no, explain:', hasTextBox: true },
      { id: '42_o_3', text: 'Can you understand most of what your child says? If no, explain:', hasTextBox: true },
      { id: '42_o_4', text: 'Can other people understand most of what your child says? If no, explain:', hasTextBox: true },
      { id: '42_o_5', text: 'Do you think your child walks, runs, and climbs like other children his age? If no, explain:', hasTextBox: true },
      { id: '42_o_6', text: 'Does either parent have a family history of childhood deafness or hearing impairment? If yes, explain:', hasTextBox: true },
      { id: '42_o_7', text: 'Do you have any concerns about your child\'s vision? If yes, explain:', hasTextBox: true },
      { id: '42_o_8', text: 'Has your child had any medical problems in the last several months? If yes, explain:', hasTextBox: true },
      { id: '42_o_9', text: 'Do you have any concerns about your child\'s behavior? If yes, explain:', hasTextBox: true },
      { id: '42_o_10', text: 'Does anything about your child worry you? If yes, explain:', hasTextBox: true }
    ]
  },
  '48': {
    communication: [
      { id: '48_c_1', text: 'Does your child name at least three items from a common category? For example, if you say to your child, "Tell me some things that you can eat," does your child answer with something like "cookies, eggs, and cereal"? Or if you say, "Tell me the names of some animals," does your child answer with something like "cow, dog, and elephant"?' },
      { id: '48_c_2', text: 'Does your child answer the following questions? <i>(Mark "sometimes" if your child answers only one question.)</i>', multipleTextBoxes: ['"What do you do when you are hungry?" <i>(Acceptable answers include "get food," "eat," "ask for something to eat," and "have a snack.")</i> Please write your child\'s response:', '"What do you do when you are tired?" <i>(Acceptable answers include "take a nap," "rest," "go to sleep," "go to bed," "lie down," and "sit down.")</i> Please write your child\'s response:'] },
      { id: '48_c_3', text: 'Does your child tell you at least two things about common objects? For example, if you say to your child, "Tell me about your ball," does she say something like, "It\'s round. I throw it. It\'s big"?' },
      { id: '48_c_4', text: 'Does your child use endings of words, such as "-s," "-ed," and "-ing"? For example, does your child say things like, "I see two cats," "I am playing," or "I kicked the ball"?' },
      { id: '48_c_5', text: 'Without your giving help by pointing or repeating, does your child follow three directions that are <i>unrelated</i> to one another? Give all three directions before your child starts. For example, you may ask your child, "Clap your hands, walk to the door, and sit down," or "Give me the pen, open the book, and stand up."' },
      { id: '48_c_6', text: 'Does your child use all of the words in a sentence (for example, "a," "the," "am," "is," and "are") to make complete sentences, such as "I am going to the park," or "Is there a toy to play with?" or "Are you coming, too?"' }
    ],
    grossMotor: [
      { id: '48_gm_1', text: 'Does your child catch a large ball with both hands? <i>(You should stand about 5 feet away and give your child two or three tries before you mark the answer.)</i>', imageAlt: 'Child catching large ball', imageUrl: '/images/48mo-gross-motor-q1.jpg' },
      { id: '48_gm_2', text: 'Does your child climb the rungs of a ladder of a playground slide and slide down without help?' },
      { id: '48_gm_3', text: 'While standing, does your child throw a ball <i>overhand</i> in the direction of a person standing at least 6 feet away? To throw overhand, your child must raise his arm to shoulder height and throw the ball forward. <i>(Dropping the ball or throwing the ball underhand should be scored as "not yet.")</i>', imageAlt: 'Child throwing ball overhand', imageUrl: '/images/48mo-gross-motor-q3.jpg' },
      { id: '48_gm_4', text: 'Does your child hop up and down on either the right or left foot at least one time without losing her balance or falling?' },
      { id: '48_gm_5', text: 'Does your child jump forward a distance of 20 inches from a standing position, starting with his feet together?' },
      { id: '48_gm_6', text: 'Without holding onto anything, does your child stand on one foot for at least 5 seconds without losing her balance and putting her foot down? <i>(You may give your child two or three tries before you mark the answer.)</i>', imageAlt: 'Child standing on one foot', imageUrl: '/images/48mo-gross-motor-q6.jpg' }
    ],
    fineMotor: [
      { id: '48_fm_1', text: 'Does your child put together a five- to seven-piece interlocking puzzle? <i>(If one is not available, take a full-page picture from a magazine or catalog and cut it into six pieces. Does your child put it back together correctly?)</i>' },
      { id: '48_fm_2', text: 'Using child-safe scissors, does your child cut a paper in half on a more or less straight line, making the blades go up and down? <i>(Carefully watch your child\'s use of scissors for safety reasons.)</i>', imageAlt: 'Child cutting paper', imageUrl: '/images/48mo-fine-motor-q2.jpg' },
      { id: '48_fm_3', text: 'Using the shapes below to look at, does your child copy at least three shapes onto a large piece of paper using a pencil, crayon, or pen, without tracing? <i>(Your child\'s drawings should look similar to the design of the shapes below, but they may be different in size.)</i>', imageAlt: 'Shapes to copy: L, +, |, O', imageUrl: '/images/48mo-fine-motor-q3.jpg' },
      { id: '48_fm_4', text: 'Does your child unbutton one or more buttons? <i>(Your child may use his own clothing or a doll\'s clothing.)</i>' },
      { id: '48_fm_5', text: 'Does your child draw pictures of people that have at least three of the following features: head, eyes, nose, mouth, neck, hair, trunk, arms, hands, legs, or feet?' },
      { id: '48_fm_6', text: 'Does your child color mostly within the lines in a coloring book or within the lines of a 2-inch circle that you draw? <i>(Your child should not go more than 1/4 inch outside the lines on most of the picture.)</i>' }
    ],
    problemSolving: [
      { id: '48_ps_1', text: 'When you say, "Say \'five eight three,\'" does your child repeat just the three numbers in the same order? Do not repeat the numbers. If necessary, try another series of numbers and say, "Say \'six nine two.\'" <i>(Your child must repeat just one series of three numbers to answer "yes" to this question.)</i>' },
      { id: '48_ps_2', text: 'When asked, "Which circle is the smallest?" does your child point to the smallest circle? <i>(Ask this question without providing help by pointing, gesturing, or looking at the smallest circle.)</i>', imageAlt: 'Three circles of different sizes', imageUrl: '/images/48mo-prob-solving-q2.jpg' },
      { id: '48_ps_3', text: 'Without your giving help by pointing, does your child follow three different directions using the words "under," "between," and "middle"? For example, ask your child to put the shoe "<b>under</b> the couch." Then ask her to put the ball "<b>between</b> the chairs" and the book "in the <b>middle</b> of the table."' },
      { id: '48_ps_4', text: 'When shown objects and asked, "What color is this?" does your child name five different colors, like red, blue, yellow, orange, black, white, or pink? <i>(Mark "yes" only if your child answers the question correctly using five colors.)</i>' },
      { id: '48_ps_5', text: 'Does your child dress up and "play-act," pretending to be someone or something else? For example, your child may dress up in different clothes and pretend to be a mommy, daddy, brother, or sister, or an imaginary animal or figure.' },
      { id: '48_ps_6', text: 'If you place five objects in front of your child, can he count them by saying, "one, two, three, four, five," in order? <i>(Ask this question without providing help by pointing, gesturing, or naming.)</i>' }
    ],
    personalSocial: [
      { id: '48_pe_1', text: 'Does your child serve herself, taking food from one container to another using utensils? For example, does your child use a large spoon to scoop applesauce from a jar into a bowl?' },
      { id: '48_pe_2', text: 'Does your child tell you at least four of the following? Please mark the items your child knows.', checkboxes: ['a. First name', 'd. Last name', 'b. Age', 'e. Boy or girl', 'c. City she lives in', 'f. Telephone number'] },
      { id: '48_pe_3', text: 'Does your child wash his hands using soap and water and dry off with a towel without help?' },
      { id: '48_pe_4', text: 'Does your child tell you the names of two or more playmates, not including brothers and sisters? <i>(Ask this question without providing help by suggesting names of playmates or friends.)</i>' },
      { id: '48_pe_5', text: 'Does your child brush her teeth by putting toothpaste on the toothbrush and brushing all of her teeth without help? <i>(You may still need to check and rebrush your child\'s teeth.)</i>' },
      { id: '48_pe_6', text: 'Does your child dress or undress himself without help (except for snaps, buttons, and zippers)?' }
    ],
    overall: [
      { id: '48_o_1', text: 'Do you think your child hears well? If no, explain:', hasTextBox: true },
      { id: '48_o_2', text: 'Do you think your child talks like other children her age? If no, explain:', hasTextBox: true },
      { id: '48_o_3', text: 'Can you understand most of what your child says? If no, explain:', hasTextBox: true },
      { id: '48_o_4', text: 'Can other people understand most of what your child says? If no, explain:', hasTextBox: true },
      { id: '48_o_5', text: 'Do you think your child walks, runs, and climbs like other children his age? If no, explain:', hasTextBox: true },
      { id: '48_o_6', text: 'Does either parent have a family history of childhood deafness or hearing impairment? If yes, explain:', hasTextBox: true },
      { id: '48_o_7', text: 'Do you have any concerns about your child\'s vision? If yes, explain:', hasTextBox: true },
      { id: '48_o_8', text: 'Has your child had any medical problems in the last several months? If yes, explain:', hasTextBox: true },
      { id: '48_o_9', text: 'Do you have any concerns about your child\'s behavior? If yes, explain:', hasTextBox: true },
      { id: '48_o_10', text: 'Does anything about your child worry you? If yes, explain:', hasTextBox: true }
    ]
  },
  '54': {
    communication: [
      { id: '54_c_1', text: 'Does your child tell you at least two things about common objects? For example, if you say to your child, "Tell me about your ball," does she say something like, "It\'s round. I throw it. It\'s big"?' },
      { id: '54_c_2', text: 'Does your child use all of the words in a sentence (for example, "a," "the," "am," "is," and "are") to make complete sentences, such as "I am going to the park," or "Is there a toy to play with?" or "Are you coming, too?"' },
      { id: '54_c_3', text: 'Does your child use endings of words, such as "-s," "-ed," and "-ing"? For example, does your child say things like, "I see two cats," "I am playing," or "I kicked the ball"?' },
      { id: '54_c_4', text: 'Without giving your child help by pointing or repeating directions, does he follow three directions that are <i>unrelated</i> to one another? Give all three directions before your child starts. For example, you may ask your child, "Clap your hands, walk to the door, and sit down," or "Give me the pen, open the book, and stand up."' },
      { id: '54_c_5', text: 'Does your child use four- and five-word sentences? For example, does your child say, "I want the car"?', hasTextBox: true, textBoxLabel: 'Please write an example:' },
      { id: '54_c_6', text: 'When talking about something that already happened, does your child use words that end in "-ed," such as "walked," "jumped," or "played"? Ask your child questions, such as "How did you get to the store?" ("We walked.") "What did you do at your friend\'s house?" ("We played.")', hasTextBox: true, textBoxLabel: 'Please write an example:' }
    ],
    grossMotor: [
      { id: '54_gm_1', text: 'Does your child hop up and down on either the right foot or the left foot at least one time without losing her balance or falling?', imageAlt: 'Child hopping on one foot', imageUrl: '/images/54mo-gross-motor-q1.jpg' },
      { id: '54_gm_2', text: 'While standing, does your child throw a ball <i>overhand</i> in the direction of a person standing at least 6 feet away? To throw overhand, your child must raise his arm to shoulder height and throw the ball forward. <i>(Dropping the ball or throwing the ball underhand should be scored as "not yet.")</i>' },
      { id: '54_gm_3', text: 'Does your child jump forward a distance of 20 inches from a standing position, starting with her feet together?' },
      { id: '54_gm_4', text: 'Does your child catch a large ball with both hands? <i>(You should stand about 5 feet away and give your child two or three tries before you mark the answer.)</i>', imageAlt: 'Child catching large ball', imageUrl: '/images/54mo-gross-motor-q4.jpg' },
      { id: '54_gm_5', text: 'Without holding onto anything, does your child stand on one foot for at least 5 seconds without losing her balance and putting her foot down? <i>(You may give your child two or three tries before you mark the answer.)</i>', imageAlt: 'Child standing on one foot', imageUrl: '/images/54mo-gross-motor-q5.jpg' },
      { id: '54_gm_6', text: 'Does your child walk on his tiptoes for 15 feet (about the length of a large car)? <i>(You may show him how to do this.)</i>' }
    ],
    fineMotor: [
      { id: '54_fm_1', text: 'Using the shapes below to look at, does your child copy at least three shapes onto a large piece of paper using a pencil, crayon, or pen, without tracing? <i>(Your child\'s drawings should look similar to the design of the shapes below, but they may be different in size.)</i>', imageAlt: 'Shapes to copy: L, +, |, O', imageUrl: '/images/54mo-fine-motor-q1.jpg' },
      { id: '54_fm_2', text: 'Does your child unbutton one or more buttons? Your child may use his own clothing or a doll\'s clothing.' },
      { id: '54_fm_3', text: 'Does your child color mostly within the lines in a coloring book or within the lines of a 2-inch circle that you draw? <i>(Your child should not go more than 1/4 inch outside the lines on most of the picture.)</i>' },
      { id: '54_fm_4', text: 'Ask your child to trace on the line below with a pencil. Does your child trace on the line without going off the line more than two times? <i>(Mark "sometimes" if your child goes off the line three times.)</i>', imageAlt: 'Line to trace', imageUrl: '/images/54mo-fine-motor-q4.jpg' },
      { id: '54_fm_5', text: 'Ask your child to draw a picture of a person on a blank sheet of paper. You may ask your child, "Draw a picture of a girl or a boy." If your child draws a person with head, body, arms, and legs, mark "yes." If your child draws a person with only three parts (head, body, arms, or legs), mark "sometimes." If your child draws a person with two or fewer parts (head, body, arms, or legs), mark "not yet." Be sure to include the sheet of paper with your child\'s drawing with this questionnaire.' },
      { id: '54_fm_6', text: 'Draw a line across a piece of paper. Using child-safe scissors, does your child cut the paper in half on a more or less straight line, making the blades go up and down? <i>(Carefully watch your child\'s use of scissors for safety reasons.)</i>', imageAlt: 'Child cutting paper', imageUrl: '/images/54mo-fine-motor-q6.jpg' }
    ],
    problemSolving: [
      { id: '54_ps_1', text: 'When shown objects and asked, "What color is this?" does your child name five different colors, like red, blue, yellow, orange, black, white, or pink? <i>(Mark "yes" only if your child answers the question correctly using five colors.)</i>' },
      { id: '54_ps_2', text: 'Does your child dress up and "play-act," pretending to be someone or something else? For example, your child may dress up in different clothes and pretend to be a mommy, daddy, brother, sister, or an imaginary animal or figure.' },
      { id: '54_ps_3', text: 'If you place five objects in front of your child, can she count them by saying, "One, two, three, four, five," in order? <i>(Ask this question without providing help by pointing, gesturing, or naming.)</i>' },
      { id: '54_ps_4', text: 'When asked, "Which circle is smallest?" does your child point to the smallest circle? <i>(Ask this question without providing help by pointing, gesturing, or looking at the smallest circle.)</i>', imageAlt: 'Three circles of different sizes', imageUrl: '/images/54mo-prob-solving-q4.jpg' },
      { id: '54_ps_5', text: 'Does your child count up to 15 without making mistakes? If so, mark "yes." If your child counts to 12 without making mistakes, mark "sometimes."', imageAlt: 'Count to 15', imageUrl: '/images/54mo-prob-solving-q5.jpg' },
      { id: '54_ps_6', text: 'Does your child know the names of numbers? <i>(Mark "yes" if he identifies the three numbers below. Mark "sometimes" if he identifies two numbers.)</i>', imageAlt: 'Numbers 3, 1, 2', imageUrl: '/images/54mo-prob-solving-q6.jpg' }
    ],
    personalSocial: [
      { id: '54_pe_1', text: 'Does your child wash her hands using soap and water and dry off with a towel without help?' },
      { id: '54_pe_2', text: 'Does your child tell you the names of two or more playmates, not including brothers and sisters? <i>(Ask this question without providing help by suggesting names of playmates or friends.)</i>' },
      { id: '54_pe_3', text: 'Does your child brush his teeth by putting toothpaste on the toothbrush and brushing all of his teeth without help? <i>(You may still need to check and rebrush your child\'s teeth.)</i>' },
      { id: '54_pe_4', text: 'Does your child serve herself, taking food from one container to another, using utensils? <i>(For example, does your child use a large spoon to scoop applesauce from a jar into a bowl?)</i>' },
      { id: '54_pe_5', text: 'Does your child tell you at least four of the following? Please mark the items your child knows.<br/>a. First name<br/>b. Age<br/>c. City he lives in<br/>d. Last name<br/>e. Boy or girl<br/>f. Telephone number' },
      { id: '54_pe_6', text: 'Does your child dress and undress herself, including buttoning medium-size buttons and zipping front zippers?' }
    ],
    overall: [
      { id: '54_o_1', text: 'Do you think your child hears well? If no, explain:', hasTextBox: true },
      { id: '54_o_2', text: 'Do you think your child talks like other children her age? If no, explain:', hasTextBox: true },
      { id: '54_o_3', text: 'Can you understand most of what your child says? If no, explain:', hasTextBox: true },
      { id: '54_o_4', text: 'Can other people understand most of what your child says? If no, explain:', hasTextBox: true },
      { id: '54_o_5', text: 'Do you think your child walks, runs, and climbs like other children his age? If no, explain:', hasTextBox: true },
      { id: '54_o_6', text: 'Does either parent have a family history of childhood deafness or hearing impairment? If yes, explain:', hasTextBox: true },
      { id: '54_o_7', text: 'Do you have any concerns about your child\'s vision? If yes, explain:', hasTextBox: true },
      { id: '54_o_8', text: 'Has your child had any medical problems in the last several months? If yes, explain:', hasTextBox: true },
      { id: '54_o_9', text: 'Do you have any concerns about your child\'s behavior? If yes, explain:', hasTextBox: true },
      { id: '54_o_10', text: 'Does anything about your child worry you? If yes, explain:', hasTextBox: true }
    ]
  },
  '60': {
    communication: [
      { id: '60_c_1', text: 'Without your giving help by pointing or repeating directions, does your child follow three directions that are <i>unrelated</i> to one another? Give all three directions before your child starts. For example, you may ask your child, "Clap your hands, walk to the door, and sit down," or "Give me the pen, open the book, and stand up."' },
      { id: '60_c_2', text: 'Does your child use four- and five-word sentences? For example, does your child say, "I want the car"?', hasTextBox: true, textBoxLabel: 'Please write an example:' },
      { id: '60_c_3', text: 'When talking about something that already happened, does your child use words that end in "-ed," such as "walked," "jumped," or "played"? Ask your child questions, such as "How did you get to the store?" ("We walked.") "What did you do at your friend\'s house?" ("We played.")', hasTextBox: true, textBoxLabel: 'Please write an example:' },
      { id: '60_c_4', text: 'Does your child use comparison words, such as "heavier," "stronger," or "shorter"? Ask your child questions, such as "A car is big, but a bus is ____" (bigger); "A cat is heavy, but a man is ____" (heavier); "A TV is small, but a book is ____" (smaller).', hasTextBox: true, textBoxLabel: 'Please write an example:' },
      { id: '60_c_5', text: 'Does your child answer the following questions? <i>(Mark "sometimes" if your child answers only one question.)</i>', multipleTextBoxes: ['"What do you do when you are hungry?" <i>(Acceptable answers include "get food," "eat," "ask for something to eat," and "have a snack.")</i> Please write your child\'s response:', '"What do you do when you are tired?" <i>(Acceptable answers include "take a nap," "rest," "go to sleep," "go to bed," "lie down," and "sit down.")</i> Please write your child\'s response:'] },
      { id: '60_c_6', text: 'Does your child repeat the sentences shown below back to you, without any mistakes? <i>(Read the sentences one at a time. You may repeat each sentence one time. Mark "yes" if your child repeats both sentences without mistakes or "sometimes" if your child repeats one sentence without mistakes.)</i><br/><br/>Jane hides her shoes for Maria to find.<br/>Al read the blue book under his bed.' }
    ],
    grossMotor: [
      { id: '60_gm_1', text: 'While standing, does your child throw a ball <i>overhand</i> in the direction of a person standing at least 6 feet away? To throw overhand, your child must raise his arm to shoulder height and throw the ball forward. <i>(Dropping the ball or throwing the ball underhand should be scored as "not yet.")</i>', imageAlt: 'Child throwing ball overhand', imageUrl: '/images/60mo-gross-motor-q1.jpg' },
      { id: '60_gm_2', text: 'Does your child catch a large ball with both hands? <i>(You should stand about 5 feet away and give your child two or three tries before you mark the answer.)</i>', imageAlt: 'Child catching large ball', imageUrl: '/images/60mo-gross-motor-q2.jpg' },
      { id: '60_gm_3', text: 'Without holding onto anything, does your child stand on one foot for at least 5 seconds without losing her balance and putting her foot down? <i>(You may give your child two or three tries before you mark the answer.)</i>', imageAlt: 'Child standing on one foot', imageUrl: '/images/60mo-gross-motor-q3.jpg' },
      { id: '60_gm_4', text: 'Does your child walk on his tiptoes for 15 feet (about the length of a large car)? <i>(You may show him how to do this.)</i>' },
      { id: '60_gm_5', text: 'Does your child hop forward on one foot for a distance of 4-6 feet without putting down the other foot? <i>(You may give her two tries on each foot. Mark "sometimes" if she can hop on one foot only.)</i>' },
      { id: '60_gm_6', text: 'Does your child skip using alternating feet? <i>(You may show him how to do this.)</i>' }
    ],
    fineMotor: [
      { id: '60_fm_1', text: 'Ask your child to trace on the line below with a pencil. Does your child trace on the line without going off the line more than two times? <i>(Mark "sometimes" if your child goes off the line three times.)</i>', imageAlt: 'Line to trace', imageUrl: '/images/60mo-fine-motor-q1.jpg', imagePosition: 'bottom' },
      { id: '60_fm_2', text: 'Ask your child to draw a picture of a person on a blank sheet of paper. You may ask your child, "Draw a picture of a girl or a boy." If your child draws a person with head, body, arms, and legs, mark "yes." If your child draws a person with only three parts (head, body, arms, or legs), mark "sometimes." If your child draws a person with two or fewer parts (head, body, arms, or legs), mark "not yet." Be sure to include the sheet of paper with your child\'s drawing with this questionnaire.' },
      { id: '60_fm_3', text: 'Draw a line across a piece of paper. Using child-safe scissors, does your child cut the paper in half on a more or less straight line, making the blades go up and down? <i>(Carefully watch your child\'s use of scissors for safety reasons.)</i>' },
      { id: '60_fm_4', text: 'Using the shapes below to look at, does your child copy the shapes in the space below without tracing? <i>(Your child\'s drawings should look similar to the design of the shapes below, but they may be different in size. Mark "yes" if she copies all three shapes; mark "sometimes" if your child copies two shapes.)</i>', imageAlt: 'Shapes to copy: +, square, triangle', imageUrl: '/images/60mo-fine-motor-q4.jpg' },
      { id: '60_fm_5', text: 'Using the letters below to look at, does your child copy the letters without tracing? Cover up all of the letters except the letter being copied. <i>(Mark "yes" if your child copies four of the letters and you can read them. Mark "sometimes" if your child copies two or three letters and you can read them.)</i>', imageAlt: 'Letters to copy: V H T C A', imageUrl: '/images/60mo-fine-motor-q5.jpg', imagePosition: 'bottom' },
      { id: '60_fm_6', text: 'Print your child\'s first name. Can your child copy the letters? The letters may be large, backward, or reversed. <i>(Mark "sometimes" if your child copies about half of the letters.)</i>' }
    ],
    problemSolving: [
      { id: '60_ps_1', text: 'When asked, "Which circle is smallest?" does your child point to the smallest circle? <i>(Ask this question without providing help by pointing, gesturing, or looking at the smallest circle.)</i><br/><br/><div class="flex items-end gap-8 mb-4"><div class="w-20 h-20 rounded-full border-2 border-slate-800"></div><div class="w-6 h-6 rounded-full border-2 border-slate-800"></div><div class="w-12 h-12 rounded-full border-2 border-slate-800"></div></div>' },
      { id: '60_ps_2', text: 'When shown objects and asked, "What color is this?" does your child name five different colors like red, blue, yellow, orange, black, white, or pink? <i>(Mark "yes" only if your child answers the question correctly using five colors.)</i>' },
      { id: '60_ps_3', text: 'Does your child count up to 15 without making mistakes? If so, mark "yes." If your child counts to 12 without making mistakes, mark "sometimes."' },
      { id: '60_ps_4', text: 'Does your child finish the following sentences using a word that means the opposite of the word that is italicized? For example: "A rock is <i>hard</i>, and a pillow is <i>soft</i>."<br/><br/>Please write your child\'s responses below:', inlineTextBoxes: ['A cow is <i>big</i>, and a mouse is', 'Ice is <i>cold</i>, and fire is', 'We see stars at <i>night</i>, and we see the sun during the', 'When I throw the ball <i>up</i>, it comes'], footerText: '<i>(Mark "yes" if he finishes three of four sentences correctly. Mark "sometimes" if he finishes two of four sentences correctly.)</i>' },
      { id: '60_ps_5', text: 'Does your child know the names of numbers? <i>(Mark "yes" if she identifies the three numbers below. Mark "sometimes" if she identifies two numbers.)</i><br/><br/><div class="flex gap-8 text-3xl font-bold"><span>3</span><span>1</span><span>2</span></div>' },
      { id: '60_ps_6', text: 'Does your child name at least four letters in her name? Point to the letters and ask, "What letter is this?" <i>(Point to the letters out of order.)</i>' }
    ],
    personalSocial: [
      { id: '60_pe_1', text: 'Can your child serve himself, taking food from one container to another, using utensils? For example, does your child use a large spoon to scoop applesauce from a jar into a bowl?' },
      { id: '60_pe_2', text: 'Does your child wash her hands and face using soap and water and dry off with a towel without help?' },
      { id: '60_pe_3', text: 'Does your child tell you at least four of the following? Please mark the items your child knows.', checkboxes: ['a. First name', 'd. Last name', 'b. Age', 'e. Boy or girl', 'c. City he lives in', 'f. Telephone number'] },
      { id: '60_pe_4', text: 'Does your child dress and undress himself, including buttoning medium-size buttons and zipping front zippers?' },
      { id: '60_pe_5', text: 'Does your child use the toilet by herself? <i>(She goes to the bathroom, sits on the toilet, wipes, and flushes.)</i> Mark "yes" even if she does this after you remind her.' },
      { id: '60_pe_6', text: 'Does your child usually take turns and share with other children?' }
    ],
    overall: [
      { id: '60_o_1', text: 'Do you think your child hears well? If no, explain:', hasTextBox: true },
      { id: '60_o_2', text: 'Do you think your child talks like other children her age? If no, explain:', hasTextBox: true },
      { id: '60_o_3', text: 'Can you understand most of what your child says? If no, explain:', hasTextBox: true },
      { id: '60_o_4', text: 'Can other people understand most of what your child says? If no, explain:', hasTextBox: true },
      { id: '60_o_5', text: 'Do you think your child walks, runs, and climbs like other children his age? If no, explain:', hasTextBox: true },
      { id: '60_o_6', text: 'Does either parent have a family history of childhood deafness or hearing impairment? If yes, explain:', hasTextBox: true },
      { id: '60_o_7', text: 'Do you have any concerns about your child\'s vision? If yes, explain:', hasTextBox: true },
      { id: '60_o_8', text: 'Has your child had any medical problems in the last several months? If yes, explain:', hasTextBox: true },
      { id: '60_o_9', text: 'Do you have any concerns about your child\'s behavior? If yes, explain:', hasTextBox: true },
      { id: '60_o_10', text: 'Does anything about your child worry you? If yes, explain:', hasTextBox: true }
    ]
  }

};

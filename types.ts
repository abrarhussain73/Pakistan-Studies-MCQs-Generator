
export interface McqOption {
  option_en: string;
  option_ur: string;
}

export interface McqItemType {
  question_en: string;
  question_ur: string;
  options: McqOption[];
  correct_answer_index: number;
}

import * as z from "zod";

export type optionType = {
  value: string;
  label: string;
};

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Image promot is required",
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions: optionType[] = [
  {
    value: "1",
    label: "1 Photo",
  },
  {
    value: "2",
    label: "2 Photo",
  },
  {
    value: "3",
    label: "3 Photo",
  },
  {
    value: "4",
    label: "4 Photo",
  },
  {
    value: "5",
    label: "5 Photo",
  },
];

export const resolutionOptions: optionType[] = [
  {
    value: "256x256",
    label: "256x256",
  },
  {
    value: "512x512",
    label: "512x512",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  },
  {
    value: "1366x768",
    label: "1366x768",
  },
];

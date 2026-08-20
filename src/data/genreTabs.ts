import { site } from "@/data/site";

export type GenreTabIcon =
  | "bolt"
  | "baby"
  | "sparkles"
  | "eye"
  | "theater"
  | "book"
  | "rocket"
  | "heart";

export type GenreTabItem = {
  id: string;
  label: string;
  icon: GenreTabIcon;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export const genreTabItems: GenreTabItem[] = [
  {
    id: "action",
    label: "Action",
    icon: "bolt",
    title: "ACTION",
    description:
      "Action books thrive on excitement, intensity, and unforgettable moments. Our expert book marketing strategies help position your action title in front of readers who crave fast-paced adventures and high-stakes storytelling. From audience targeting to promotional campaigns, we help generate visibility that keeps your book moving forward.",
    imageSrc: "/action.webp",
    imageAlt: "Action genre book cover",
  },
  {
    id: "children",
    label: "Children",
    icon: "baby",
    title: "CHILDREN",
    description:
      "Children's books deserve marketing that inspires curiosity and imagination. Our team creates strategies designed to reach parents, educators, and young readers through targeted promotion and audience engagement. We help your book stand out while building awareness around your story and brand.",
    imageSrc: "/children.webp",
    imageAlt: "Children genre book cover",
  },
  {
    id: "fantasy",
    label: "Fantasy",
    icon: "sparkles",
    title: "FANTASY",
    description:
      "Fantasy readers are passionate about discovering immersive worlds and unforgettable adventures. Our book marketing specialists develop campaigns designed to connect your fantasy title with audiences searching for magical storytelling. We help maximize discoverability so your book can reach the readers who will love it most.",
    imageSrc: "/fantasy.webp",
    imageAlt: "Fantasy genre book cover",
  },
  {
    id: "suspense",
    label: "Suspense",
    icon: "eye",
    title: "SUSPENSE",
    description:
      "Suspense books rely on anticipation, intrigue, and unforgettable twists. Our marketing solutions help create excitement around your release while positioning your book for stronger visibility. We focus on attracting readers who enjoy gripping stories that keep them turning pages until the very end.",
    imageSrc: "/suspense.webp",
    imageAlt: "Suspense genre book cover",
  },
  {
    id: "drama",
    label: "Drama",
    icon: "theater",
    title: "DRAMA",
    description:
      "Powerful storytelling deserves meaningful exposure. Our marketing experts help drama authors connect with audiences who appreciate emotional narratives and compelling characters. Through strategic promotion and targeted visibility campaigns, we help your book build lasting impact.",
    imageSrc: "/drama.webp",
    imageAlt: "Drama genre book cover",
  },
  {
    id: "novel",
    label: "Novel",
    icon: "book",
    title: "NOVEL",
    description:
      "Every novel tells a unique story, and every story deserves the right audience. Our professional marketing services help improve discoverability while increasing awareness around your title. We create customized promotional strategies designed to help your novel stand out in competitive marketplaces.",
    imageSrc: "/novel.webp",
    imageAlt: "Novel genre book cover",
  },
  {
    id: "fiction",
    label: "Fiction",
    icon: "rocket",
    title: "FICTION",
    description:
      "Fiction publishing is competitive, making strong marketing essential for success. Our specialists build strategies designed to improve visibility, strengthen audience reach, and help your book gain attention from readers actively searching for new stories. We focus on helping your fiction title grow beyond publication.",
    imageSrc: "/fiction.webp",
    imageAlt: "Fiction genre book cover",
  },
  {
    id: "romantic",
    label: "Romantic",
    icon: "heart",
    title: "ROMANTIC",
    description:
      "Romance readers connect deeply with emotion, chemistry, and unforgettable characters. Our marketing experts help position your romantic title in front of readers who love meaningful storytelling and emotional journeys. Through targeted campaigns and promotional strategies, we help your story reach hearts worldwide.",
    imageSrc: "/romantic.webp",
    imageAlt: "Romantic genre book cover",
  },
];

export const genreTabsPhone = site.phone;
export const genreTabsPhoneHref = site.phoneHref;

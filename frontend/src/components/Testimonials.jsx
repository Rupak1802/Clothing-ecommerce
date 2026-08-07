import { CircularTestimonials } from "./ui/CircularTestimonials";

const testimonials = [
  {
    quote:
      "I was impressed by the clothes! And I could really tell that they use high-quality materials. The delivery was fast. I'll definitely be back for more!",
    name: "Tamar Mendelson",
    designation: "Fashion Critic",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRqvQ-E4yQSBCdGREugegTX4QDkaKRm3m_tWLpe4JjVg&s=10",
  },
  {
    quote:
      "This brand exceeded all expectations! The clothes are amazing, and the team truly goes above and beyond. I'll keep returning for more.",
    name: "Joe Charlescraft",
    designation: "Frequent Visitor",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSevdTh_YtVuJucisnBSjCB8rRaTODkSdtt3xDYLqKxBgJinVun9-jBTq89&s=10",
  },
  {
    quote:
      "THUKIL is a hidden gem! The impeccable quality and overall attention to detail created a memorable experience. I highly recommend it!",
    name: "Martina Edelweist",
    designation: "Satisfied Customer",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWuPC_nIdlR-1Hw6J4hq8OGQZbt5fDkn5vGiTObe9sB82GJHPOZfe4_GDW&s=10",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-bg-dark py-20 overflow-hidden border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4 text-center">
        <span className="font-accent text-3xl text-primary block mb-2">
          Customer Notes
        </span>
        <h2 className="font-display text-3xl font-light tracking-tight sm:text-4xl text-text-primary">
          Loved by the Community
        </h2>
        <div className="mt-4 mx-auto h-[1px] w-20 bg-border" />
      </div>

      <div className="w-full flex items-center justify-center relative mt-12">
        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          colors={{
            name: "var(--color-text-primary)",
            designation: "var(--color-text-muted)",
            testimony: "var(--color-text-secondary)",
            arrowBackground: "var(--color-bg-secondary)",
            arrowForeground: "var(--color-text-primary)",
            arrowHoverBackground: "var(--color-primary)",
          }}
          fontSizes={{
            name: "28px",
            designation: "16px",
            quote: "20px",
          }}
        />
      </div>
    </section>
  );
}

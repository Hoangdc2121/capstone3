export default function AuthVisual() {
  return (
    <section className="relative hidden min-h-160 overflow-hidden bg-secondary lg:block">
      <img
        src="/images/auth-sneaker.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"
      />

      <div className="relative flex h-full min-h-160 flex-col justify-end p-10 xl:p-12">
        <h2 className="font-heading text-4xl leading-none text-white">
          Editorial selection
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-7 text-white/85">
          Thiết kế độc bản, hoàn thiện thủ công với gam màu terracotta thời
          thượng. Trải nghiệm không gian sneaker boutique tinh tuyển.
        </p>
      </div>
    </section>
  );
}

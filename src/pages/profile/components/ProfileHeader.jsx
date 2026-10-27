import React from "react";

export default function ProfileHeader() {
  return (
    <section className="mb-6 border-b border-border pb-6 sm:mb-8">
      <h1
        id="profile-title"
        className="font-heading text-4xl uppercase leading-tight text-foreground sm:text-5xl"
      >
        Tài khoản của bạn
      </h1>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Quản lý thông tin cá nhân, đơn hàng và những đôi sneaker yêu thích.
      </p>
    </section>
  );
}

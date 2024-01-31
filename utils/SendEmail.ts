import nodemailer from "nodemailer";

type EmailParams = {
  email?: string;
  resetUrl?: string;
  name?: string;
};

export const sendResetPasswordEmail = async ({
  email,
  resetUrl,
  name,
}: EmailParams): Promise<{ message: string }> => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Support d'Uncut Vidéo" <${process.env.GOOGLE_EMAIL}>`,
      to: email,
      subject: `Réinitialisation de votre mot de passe`,
      html: `
        <p>Bonjour ${name},</p>
        <p>Vous avez demandé à réinitialiser votre mot de passe. Veuillez cliquer sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
        <a href="${resetUrl}">Réinitialiser le mot de passe</a>
        <p>Ce lien expirera dans une heure. Si vous n'avez pas demandé la réinitialisation de votre mot de passe, veuillez ignorer cet e-mail.</p>
        <p>Cordialement,</p>
        <p>L'équipe d'Uncut Vidéo</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject({ message: `Une erreur s'est produite lors de l'envoi de l'e-mail` });
      } else {
        console.log(`Email sent: ${info.response}`);
        resolve({ message: "E-mail de réinitialisation envoyé avec succès" });
      }
    });
  });
};

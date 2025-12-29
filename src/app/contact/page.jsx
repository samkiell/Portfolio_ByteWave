/**
 * Contact page (Project inquiries)
 * - Renders an interactive inquiry form (client component)
 * - The form posts to `/api/inquiry` where server-side validation & email sending occurs
 */
import InquiryForm from '../../components/forms/InquiryForm';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-center">Get In Touch</h1>

      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-center">
        Prefer email? Reach us at <a href="mailto:bytewaveteams@gmail.com" className="text-accent underline">bytewaveteams@gmail.com</a>
      </p>

      <div className="mt-8 max-w-3xl mx-auto">
        <InquiryForm />
      </div>
    </div>
  );
}

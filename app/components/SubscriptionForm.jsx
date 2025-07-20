import { useFormik } from 'formik';
import * as Yup from 'yup';
import { subscribeToNewsletter } from '@/app/lib/api'; 

export default function SubscriptionForm() {
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await subscribeToNewsletter(values.email);
        alert('Subscribed successfully!');
        resetForm();
      } catch (error) {
        alert('Subscription failed!');
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col sm:flex-row gap-2 w-full max-w-md"
    >
      <div className="w-full">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 transition-all duration-150 ${
            formik.touched.email && formik.errors.email
              ? 'border-red-500 focus:ring-red-300'
              : 'border-gray-300 focus:ring-[#A15F3F]'
          } text-black`}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
       
      </div>

      <button
  type="submit"
  className="bg-[#A15F3F] text-white font-medium px-4 py-2 rounded transition-colors duration-150"
>
  Subscribe
</button>

    </form>
  );
}

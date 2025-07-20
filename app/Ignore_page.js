

// app/page.js
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/en') // or dynamically based on user location
}

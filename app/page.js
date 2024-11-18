// import { Button } from "@/components/ui/button";

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div>
//       <h2>Hello I am Chetan</h2>
//       <Button>Subscribe</Button>
//     </div>

//   );
// }

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard'); // Redirect to the sign-up page
}

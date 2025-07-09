export async function GET() {
  const results = [
    {
      id: 1,
      name: "Sohan Kurale",
      beforeScore: 60,
      afterScore: 85,
      experience: "System Engineer",
      photoUrl: "/SohanImage.jpg",
    },
    {
      id: 2,
      name: "Abhishek Swami",
      beforeScore: 50,
      afterScore: 80,
      experience: "Python Developer",
      photoUrl: "/AbhishekImage.jpg",
    },
    {
      id: 3,
      name: "Pratik Chougule",
      beforeScore: 65,
      afterScore: 80,
      experience: "Machine learning engineer",
      photoUrl: "/Pratik_Photo.png",
    },
    {
      id: 4,
      name: "Vivek Mane",
      beforeScore: 30,
      afterScore: 54,
      experience: "Business Analyst",
      photoUrl: "/Vivek_Image.jpg",
    },
  ];
  

  return new Response(JSON.stringify(results), { status: 200 });
}

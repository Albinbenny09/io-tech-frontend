// Services fetch

export async function getServices(locale = 'en') {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API}/services?populate=*&locale=${locale}`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getServiceBySlug(slug, locale = 'en') {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API}/services?filters[slug][$eq]=${slug}&populate=*&locale=${locale}`,
      { cache: 'no-store' }
    );

    const json = await res.json();

    if (!json.data || json.data.length === 0) return null;

    return json.data[0]; // returns the single matched service
  } catch (error) {
    console.error(`Error fetching service by slug (${slug}) for locale ${locale}:`, error);
    return null;
  }
}

// Get all team members
// Fetch team members


// Search services and team by query
export async function searchContent(query) {
  const [servicesRes, teamRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/services?filters[title][$containsi]=${query}&populate=*`),
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/team-members?filters[Name][$containsi]=${query}&populate=*`),
  ]);

  const servicesJson = await servicesRes.json();
  const teamJson = await teamRes.json();
  

  const services = servicesJson.data.map(item => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    short_description: item.short_description,
    cover_image: item.cover_image?.url || null,
    category: item.category,
  }));

  const team = teamJson.data.map(item => ({
    id: item.id,
    name: item.Name,
    position: item.Position,
    slug: item.slug,
    photo: item.Photo?.url || null,
    slug: item.Slug || null,
    phone: item.Phone || null,
    email: item.Email || null,
  }));

  return { services, team };
}

export async function getTeamMembers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/team-members?populate=*`);
  const data = await res.json();

  return data.data.map((item) => ({
    id: item.id,
    name: item.Name,
    email: item.Email,
    phone: item.Phone,
    position: item.Position,
    slug: item.Slug,
    photo: item.Photo?.url || '', // ✅ direct access to photo.url
  }));
}


export async function getTeamMemberBySlug(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/team-members?filters[Slug][$eq]=${slug}&populate=*`);
  const data = await res.json();

  const item = data.data[0];
  if (!item) return null;

  return {
    id: item.id,
    name: item.Name,
    position: item.Position,
    slug: item.Slug,
    phone: item.Phone || null,
    email: item.Email || null,
    photo: item.photo?.data?.attributes?.url || null,
  };
}


export async function getHeroPages(locale ='en') {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/hero-pages?locale=${locale}&populate=media`);
    const data = await res.json();
    console.log(data);

    return data?.data?.map(item => ({
      id: item.id,
      heading: item.heading,
      description: item.description,
      media: item.media?.map(file => ({
        url: `http://localhost:1337${file.url}`,
        mime: file.mime,
      })) || []
    })); // ✅ <-- Closing parenthesis was missing here
  } catch (error) {
    console.error("Error fetching HeroPages:", error);
    return [];
  }
}

// api.js

export async function getClients(locale = 'en') {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API}/clients?populate=image&locale=${locale}`
    );
    const data = await res.json();

    return data?.data?.map((item) => {
      const { heading, description, comment, name, position, image } = item;
      return {
        id: item.id,
        heading,
        description,
        testimonial: comment,
        name,
        position,
        image:image?.url,
      };
    }) || [];
  } catch (error) {
    console.error("Error fetching client testimonials:", error);
    return [];
  }
}

// lib/api.js or wherever your API helpers are
export async function subscribeToNewsletter(email) {
  try {
    const res = await fetch('${process.env.NEXT_PUBLIC_STRAPI_API}/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { email } }),
    });

    if (!res.ok) {
      throw new Error('Subscription failed');
    }

    return await res.json(); // optional: return the data
  } catch (err) {
    console.error("Subscription error:", err);
    throw err;
  }
}

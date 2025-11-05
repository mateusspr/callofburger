import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Criar restaurante
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Call of Burger",
      slug: "call-of-burger",
      address: "Beco Do Soares, 918 - São Lucas - Viamão - RS",
      phone: "51999999999",
      cep: "94450-550",
    },
  });

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Burgers",
        restaurantId: restaurant.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Acompanhamentos",
        restaurantId: restaurant.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Bebidas",
        restaurantId: restaurant.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Combos",
        restaurantId: restaurant.id,
      },  
      
    }),
  ]);

  // Criar produtos
  const products = await Promise.all([
    // Burgers
    prisma.product.create({
      data: {
        name: "Classic Burger",
        description:
          "Hambúrguer artesanal, queijo cheddar, alface, tomate e molho especial",
        price: 28.9,
        image: "/images/classic-burger.jpg",
        categoryId: categories[0].id,
        restaurantId: restaurant.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "Double Burger",
        description:
          "Dois hambúrgueres artesanais, queijo cheddar duplo, bacon, alface, tomate e molho especial",
        price: 34.9,
        image: "/images/double-burger.jpg",
        categoryId: categories[0].id,
        restaurantId: restaurant.id,
      },
    }),
    // Acompanhamentos
    prisma.product.create({
      data: {
        name: "Batata Frita",
        description: "Porção de batatas fritas crocantes",
        price: 12.9,
        image: "/images/fries.jpg",
        categoryId: categories[1].id,
        restaurantId: restaurant.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "Onion Rings",
        description: "Anéis de cebola empanados",
        price: 14.9,
        image: "/images/onion-rings.jpg",
        categoryId: categories[1].id,
        restaurantId: restaurant.id,
      },
    }),
    // Bebidas
    prisma.product.create({
      data: {
        name: "Refrigerante",
        description: "Coca-Cola, Guaraná ou Sprite (350ml)",
        price: 6.9,
        image: "/images/soda.jpg",
        categoryId: categories[2].id,
        restaurantId: restaurant.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "Suco Natural",
        description: "Laranja, Limão ou Maracujá (400ml)",
        price: 8.9,
        image: "/images/juice.jpg",
        categoryId: categories[2].id,
        restaurantId: restaurant.id,
      },
    }),
  ]);

  // Criar cliente exemplo
  const customer = await prisma.customer.create({
    data: {
      name: "Cliente Teste",
      phone: "11988887777",
    },
  });

  // Criar pedido exemplo
  await prisma.order.create({
    data: {
      customerId: customer.id,
      restaurantId: restaurant.id,
      status: "PENDING",
      total: 48.7,
      items: {
        create: [
          {
            productId: products[0].id, // Classic Burger
            quantity: 1,
            price: 28.9,
          },
          {
            productId: products[2].id, // Batata Frita
            quantity: 1,
            price: 12.9,
          },
          {
            productId: products[4].id, // Refrigerante
            quantity: 1,
            price: 6.9,
          },
        ],
      },
    },
  });

  console.log("Seed concluído! 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

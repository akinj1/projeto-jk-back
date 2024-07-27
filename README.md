# Back-end Projeto jk


### Dependencias
- docker
- docker compose
- node > 18



### Variaveis de ambiente 

DATABASE_URL="postgresql://akin:banana@192.168.1.104:5432/db?schema=public"

TOKEN_SECRET="mopopooppopop"

TOKEN_EXPIRATION="7d"

### Dependencias
- docker
- docker compose
- node > 18

### instalar node modules

```bash
npm install 

yarn
```

### Iniciar Banco 

```bash
sudo docker compose up -d
```

### iniciar prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed


yarn prisma generate
yarn prisma migrate dev --name init
yarn prisma db seed
```

### Iniciar projeto
```bash
npm run dev

yarn dev
```
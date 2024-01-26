# Note API
Estudo de nest e TDD

OBS.: As rotas de API são **públicas**. 

## Iniciar setup
```bash
docker-compose up -d
```

## Endpoints

####  GET /notes/:slug - Get a note
```bash
curl 'http://localhost:3000/notes/my-slug'
```

####  PUT /notes/:slug - Create or update a note
```bash
curl 'http://localhost:3000/notes/my-slug' -X PUT -d 'text=my-text'
```

define({
	"api": [
		{
			"type": "delete",
			"url": "/video/:id",
			"title": "Excluir Video.",
			"description": "<p>Excluir video.</p>",
			"group": "Video",
			"error": {
				"examples": [
					{
						"title": "Error-Response:",
						"content": "HTTP/2 4XX | 5XX\n{\n  \"error\": \"true\",\n  \"message\": \"...\"\n}",
						"type": "json"
					}
				]
			},
			"success": {
				"examples": [
					{
						"title": "Success-Response:",
						"content": "HTTP/2 200 OK\n{\n  \"error\": false,\n  \"message\": \"Video removido com sucesso!\"\n}",
						"type": "json"
					}
				]
			},
			"version": "1.0.0",
			"filename": "./src/controller/Videos/VideoController.ts",
			"groupTitle": "Video",
			"name": "DeleteVideoId"
		},
		{
			"type": "get",
			"url": "/video/:filename",
			"title": "Visualizar Video.",
			"description": "<p>Visualizar video.</p>",
			"group": "Video",
			"error": {
				"examples": [
					{
						"title": "Error-Response:",
						"content": "HTTP/2 4XX | 5XX\n{\n  \"error\": \"true\",\n  \"message\": \"...\"\n}",
						"type": "json"
					}
				]
			},
			"success": {
				"examples": [
					{
						"title": "Success-Response:",
						"content": "HTTP/2 206 OK",
						"type": "json"
					}
				]
			},
			"version": "1.0.0",
			"filename": "./src/controller/Videos/VideoController.ts",
			"groupTitle": "Video",
			"name": "GetVideoFilename"
		},
		{
			"type": "get",
			"url": "/videos",
			"title": "Buscar Videos.",
			"description": "<p>Buscar Videos.</p>",
			"group": "Video",
			"error": {
				"examples": [
					{
						"title": "Error-Response:",
						"content": "HTTP/2 4XX | 5XX\n{\n  \"error\": \"true\",\n  \"message\": \"...\"\n}",
						"type": "json"
					}
				]
			},
			"success": {
				"examples": [
					{
						"title": "Success-Response:",
						"content": "HTTP/2 200 OK\n[\n {\n   titulo?: string,\n   tituloOriginal: string,\n   categoria: VideoCategoriaEnum,\n   tipo: VideoTipoEnum,\n   arquivo: string\n }\n]",
						"type": "json"
					}
				]
			},
			"version": "1.0.0",
			"filename": "./src/controller/Videos/VideoController.ts",
			"groupTitle": "Video",
			"name": "GetVideos"
		},
		{
			"type": "post",
			"url": "/video",
			"title": "Incluir Video.",
			"description": "<p>Incluir novo video.</p>",
			"group": "Video",
			"parameter": {
				"fields": {
					"Parameter": [
						{
							"group": "Parameter",
							"type": "string",
							"optional": false,
							"field": "tituloOriginal",
							"description": "<p>Título Original do Video.</p>"
						},
						{
							"group": "Parameter",
							"type": "string",
							"optional": false,
							"field": "titulo",
							"description": "<p>Titulo Personalizado do Video.</p>"
						},
						{
							"group": "Parameter",
							"type": "TipoVideoEnum",
							"optional": false,
							"field": "tipo",
							"description": "<p>Tipo do Video [1 = Filme, 2 = Série].</p>"
						},
						{
							"group": "Parameter",
							"type": "CategoriaVideoEnum",
							"optional": false,
							"field": "categoria",
							"description": "<p>Categoria do Video.</p>"
						},
						{
							"group": "Parameter",
							"type": "VideoArquivoInterface",
							"optional": false,
							"field": "arquivo",
							"description": "<p>Arquivo do video {filename: string; type: string; base64: string;}.</p>"
						},
						{
							"group": "Parameter",
							"type": "string",
							"optional": false,
							"field": "ext",
							"description": "<p>Extensão do video.</p>"
						}
					]
				}
			},
			"error": {
				"examples": [
					{
						"title": "Error-Response:",
						"content": "HTTP/2 4XX | 5XX\n{\n  \"error\": \"true\",\n  \"message\": \"...\"\n}",
						"type": "json"
					}
				]
			},
			"success": {
				"examples": [
					{
						"title": "Success-Response:",
						"content": "HTTP/2 200 OK\n{\n  \"error\": false,\n  \"message\": \"Video incluído com sucesso!\"\n}",
						"type": "json"
					}
				]
			},
			"version": "1.0.0",
			"filename": "./src/controller/Videos/VideoController.ts",
			"groupTitle": "Video",
			"name": "PostVideo"
		},
		{
			"type": "put",
			"url": "/video/:id",
			"title": "Editar Video.",
			"description": "<p>Editar video.</p>",
			"group": "Video",
			"parameter": {
				"fields": {
					"Parameter": [
						{
							"group": "Parameter",
							"type": "String",
							"optional": false,
							"field": "tituloOriginal",
							"description": "<p>Título Original do Video.</p>"
						},
						{
							"group": "Parameter",
							"type": "String",
							"optional": false,
							"field": "titulo",
							"description": "<p>Titulo Personalizado do Video.</p>"
						},
						{
							"group": "Parameter",
							"type": "TipoVideoEnum",
							"optional": false,
							"field": "tipo",
							"description": "<p>Tipo do Video [1 = Filme, 2 = Série].</p>"
						},
						{
							"group": "Parameter",
							"type": "CategoriaVideoEnum",
							"optional": false,
							"field": "categoria",
							"description": "<p>Categoria do Video.</p>"
						}
					]
				}
			},
			"error": {
				"examples": [
					{
						"title": "Error-Response:",
						"content": "HTTP/2 4XX | 5XX\n{\n  \"error\": \"true\",\n  \"message\": \"...\"\n}",
						"type": "json"
					}
				]
			},
			"success": {
				"examples": [
					{
						"title": "Success-Response:",
						"content": "HTTP/2 200 OK\n{\n  \"error\": false,\n  \"message\": \"Video atualizado com sucesso!\"\n}",
						"type": "json"
					}
				]
			},
			"version": "1.0.0",
			"filename": "./src/controller/Videos/VideoController.ts",
			"groupTitle": "Video",
			"name": "PutVideoId"
		}
	]
});

var map = {
    load: function() {
        var data = [
            {"title" : "Empreendimento 1", "latitude" : -3.744228, "longitude" : -38.473919, "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, officiis, incidunt totam cupiditate neque cumque quia. Obcaecati, perferendis, et autem ut dolorum sapiente cupiditate odio similique molestias vero voluptatibus officiis."},
            {"title" : "Empreendimento 2", "latitude" : -3.745598, "longitude" : -38.469788, "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, eveniet, quisquam, adipisci voluptas repudiandae omnis quas placeat voluptate dolorem sit dolore quis ratione quod totam quibusdam nemo dolor reprehenderit excepturi."},
            {"title" : "Empreendimento 3", "latitude" : -3.745374, "longitude" : -38.470368, "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, atque, ea amet labore rerum reiciendis voluptatibus unde perspiciatis expedita doloremque inventore molestiae tempore eligendi. Ratione consequatur numquam a accusamus eum!"},
            {"title" : "Empreendimento 4", "latitude" : -3.744228, "longitude" : -38.473919, "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, voluptates, eius at impedit ut quos repellat velit aliquam molestiae molestias mollitia dolores architecto debitis laudantium optio distinctio veniam enim voluptatibus."},
            {"title" : "Empreendimento 5", "latitude" : -3.744228, "longitude" : -38.473919, "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, voluptates, eius at impedit ut quos repellat velit aliquam molestiae molestias mollitia dolores architecto debitis laudantium optio distinctio veniam enim voluptatibus."},
            {"title" : "Empreendimento 6", "latitude" : -3.744228, "longitude" : -38.473919, "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, voluptates, eius at impedit ut quos repellat velit aliquam molestiae molestias mollitia dolores architecto debitis laudantium optio distinctio veniam enim voluptatibus."},
            {"title" : "Empreendimento 7", "latitude" : -3.753863, "longitude" : -38.522187, "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, magnam, repudiandae, repellendus vitae a maxime eaque eius perspiciatis nobis nesciunt itaque ut modi minima aliquid quas quam consequuntur consectetur expedita."},
            {"title" : "Empreendimento 8", "latitude" : -3.753719, "longitude" : -38.521549, "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, dolore id quasi recusandae delectus reprehenderit asperiores fugiat laboriosam molestias pariatur illo aspernatur rem voluptas voluptates inventore fugit suscipit ullam optio!"},
            {"title" : "Empreendimento 9", "latitude" : -3.758874, "longitude" : -38.612503, "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, culpa, debitis, laborum, amet excepturi animi ullam veniam accusamus maxime totam laudantium eius beatae libero consectetur fugit molestias nobis. Beatae, culpa."},
            {"title" : "Empreendimento 10", "latitude" : -3.762738, "longitude" : -38.614059, "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, odio, in, quaerat soluta quo dignissimos reiciendis quos necessitatibus maiores earum et cupiditate delectus officia minima dolorum optio molestias iure non?"}
        ];

        this.initialize(data);
    },
    createMap: function() {
        var center = new google.maps.LatLng(-12.235004, -47.92527999999999);

        var map = new google.maps.Map(document.getElementById('map_canvas'), {
            zoom: 3,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        return map;
    },
    initialize: function(data) {
        var map = this.createMap();

        // Teia de marcadores
        var oms = new OverlappingMarkerSpiderfier(map);

        // Adição dos marcadores no mapa a partir do arquivo JSON
        var markers = [];
        for (var i = 0; i < data.length; i++) {
            var dataPhoto = data[i];

            var latLng = new google.maps.LatLng(dataPhoto.latitude, dataPhoto.longitude);
            var title = dataPhoto.title;
            var desc = dataPhoto.description;

            var marker = new google.maps.Marker({
                position: latLng,
                title: title,
                content: desc
            });
            markers.push(marker);
            oms.addMarker(marker); // Informando para a classe que cria a teia quais marcadores foram adicionados ao mapa.
        }

        var info_window = new google.maps.InfoWindow();
        oms.addListener('click', function(marker, event) {
            var content = "<h1>" + marker.title + "</h1><p>" + marker.content + "</p>";
            info_window.setContent(content);
            info_window.open(map, marker);
        });

        oms.addListener('spiderfy', function(markers) {
            info_window.close();
        });

        // Agrupador de marcadores
        var mcOptions = {maxZoom: 16};
        var markerCluster = new MarkerClusterer(map, markers, mcOptions);
    }
}
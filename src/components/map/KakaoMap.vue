s
<template>
  <div>
    <div id="map" :places="places" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      bounds: null,
    };
  },
  mounted() {
    window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
  },
  watch: {
    places() {
      this.initMap();
    },
  },
  computed: {
    places() {
      return this.$store.getters.aptResult;
    },
  },
  methods: {
    initMap() {
      var container = document.getElementById("map");
      var options = { center: new kakao.maps.LatLng(37.56641, 126.977967), level: 10 };
      this.map = new kakao.maps.Map(container, options); //마커추가하려면 객체를 아래와 같이 하나 만든다.

      var marker = new kakao.maps.Marker({ position: this.map.getCenter() });
      marker.setMap(this.map);
      this.makeMarkerData();
    },
    addScript() {
      const script = document.createElement("script");

      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=2d21dcba471c972f7b405f5f6aac4135";
      document.head.appendChild(script);
    },
    makeMarkerData() {
      var positions = [];
      console.log(this.places);
      for (let i = 0; i < this.places.length; i++) {
        positions.push({
          title: this.places[i].aptName,
          latlng: new kakao.maps.LatLng(
            parseFloat(this.places[i].lat),
            parseFloat(this.places[i].lng)
          ),
        });
      }
      console.log(positions);
      // 마커 이미지의 이미지 주소입니다
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      for (var i = 0; i < positions.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });
      }
    },
    makeBounds() {
      var points = [];
      console.log(this.places);
      for (let i = 0; i < this.places.length; i++) {
        points.push(
          new kakao.maps.LatLng(parseFloat(this.places[i].lat), parseFloat(this.places[i].lng))
        );
      }

      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
      this.bounds = new kakao.maps.LatLngBounds();

      var i, marker;
      for (i = 0; i < points.length; i++) {
        // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
        marker = new kakao.maps.Marker({ position: points[i] });
        marker.setMap(this.map);

        // LatLngBounds 객체에 좌표를 추가합니다
        this.bounds.extend(points[i]);
        this.setBounds();
      }
    },
    setBounds() {
      this.map.setBounds(this.bounds);
    },
  },
};
</script>

<style scoped></style>

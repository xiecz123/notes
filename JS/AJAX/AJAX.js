var request;
if (window.XMLHttpRequest) {
  request = new XMLHttpRequest()
} else {
  request = new ActiveXObject("Microsoft.XMLHTTP") // 兼容IE5、IE6
}
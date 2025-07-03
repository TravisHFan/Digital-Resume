// 这个文件的功能是:
// 在网页加载完成后，监听一个叫 contactForm 的表单提交事件，阻止默认提交行为，
// 然后用 JavaScript 发起一个 POST 请求将表单数据提交到后端 API，最后显示用户提示。

document.addEventListener("DOMContentLoaded", function () {
  //当 HTML 页面结构加载完成后（但可能图片等未加载），执行这个函数。确保 DOM 元素已准备好再操作它们。
  const contactForm = document.getElementById("contactForm"); //获取页面中 ID 为 contactForm 的表单元素，赋值给变量 contactForm。

  if (contactForm) {
    // 如果找到了这个表单（防止页面中没有该元素时报错），才继续后续绑定操作。
    contactForm.addEventListener("submit", async function (e) {
      //为表单绑定一个 submit 提交事件监听器，并定义为异步函数（因为后面要用 await 调用接口）。
      /* "submit" 并不是来自 <button type="submit"> 的属性值，而是指 整个表单（<form>）触发的提交事件名。 
        这行代码给 contactForm（一个 <form> 元素）添加了监听器。
        "submit" 是浏览器内建的一个事件名，表示表单被提交时触发。*/

      e.preventDefault(); // 🛑 阻止默认提交行为，否则会直接刷新页面，而不是用 JavaScript 发送数据。

      //找到提交按钮，并记录它原本的文字内容（用于后面恢复按钮状态）。
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";

      try {
        // Collect form data
        const formData = new FormData(contactForm); //用 FormData 对象从表单中自动收集所有输入字段的数据。
        const data = Object.fromEntries(formData.entries()); //把 FormData 转成一个普通的 JavaScript 对象，便于用 JSON.stringify 发送。

        // Send to backend
        const response = await fetch(
          //使用 fetch 向后端 API 地址发起异步请求，使用 POST 方法。
          "http://localhost:3001/api/contact/submit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data), //设置请求头为 application/json，并把表单数据序列化成 JSON 发送到后端。
          }
        );

        const result = await response.json(); //等待服务器响应并将其解析为 JSON。

        if (response.ok) {
          //如果响应状态码是 2xx（表示成功），进入成功逻辑。
          // Show success message
          alert("Thank you for your message! I will get back to you soon.");
          contactForm.reset(); //显示成功消息并清空表单内容。
        } else {
          // Show error message
          alert(
            "Error: " +
              (result.error || "Something went wrong. Please try again.")
          ); //如果请求失败（如 400/500 错误），显示后端返回的错误信息，或默认错误提示。
        }
      } catch (error) {
        //如果 fetch 本身出错（如网络问题），进入 catch，输出错误并弹出网络错误提示。
        console.error("Error:", error);
        alert("Network error. Please check your connection and try again.");
      } finally {
        //不管成功或失败，最后都把按钮恢复到原始状态（解除禁用，恢复文字）。
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  }
});

//TODO: 验证邮箱格式；提交后弹出模态框（非 alert）；成功后跳转或自动关闭提示

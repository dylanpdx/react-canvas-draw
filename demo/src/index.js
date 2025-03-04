import React, { Component } from "react";
import { render } from "react-dom";

import CanvasDraw from "../../src";
import classNames from "./index.css";

class Demo extends Component {
  state = {
    color: "#ffc600",
    width: 400,
    height: 400,
    brushRadius: 10,
    lazyRadius: 12,
    backgroundImg: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg",
    imgs: [
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg",
      "https://i.imgur.com/a0CGGVC.jpg"
    ]
  };

  componentDidMount() {
    // let's change the color randomly every 2 seconds. fun!
    window.setInterval(() => {
      this.setState({
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      });
    }, 2000);

    // let's change the background image every 2 seconds. fun!
    window.setInterval(() => {
      if (
        this.state.imgs &&
        this.state.imgs.length &&
        this.state.backgroundImg
      ) {
        let img = '';
        let imgs = this.state.imgs;
        for (let i = 0; i < imgs.length; i++) {
          if (this.state.backgroundImg !== imgs[i]) {
            img = imgs[i];
          }
        }

        this.setState({
          backgroundImg: img,
        });
      }
    }, 2000);

  }
  render() {
    return (
      <div>
        <h1>React Canvas Draw</h1>
        <iframe
          title="GitHub link"
          src="https://ghbtns.com/github-btn.html?user=embiem&repo=react-canvas-draw&type=star&count=true"
          frameBorder="0"
          scrolling="0"
          width="160px"
          height="30px"
        />
        <h2>default</h2>
        <p>
          This is a simple <span>{`<CanvasDraw />`}</span> component with
          default values.
        </p>
        <p>Try it out! Draw on this white canvas:</p>
        <CanvasDraw onChange={() => console.log("onChange")} />
        <h2>Custom Brush-Color</h2>
        <p>
          Let's spice things up by using custom brush colors{" "}
          <span>{`<CanvasDraw brushColor={this.state.color} />`}</span>. We
          randomly change them every 2 seconds. But you could easily use a
          color-picker!
        </p>
        <div>
          Current color:{" "}
          <div
            style={{
              display: "inline-block",
              width: "24px",
              height: "24px",
              backgroundColor: this.state.color,
              border: "1px solid #272727"
            }}
          />
        </div>
        <CanvasDraw brushColor={this.state.color} />
        <h2>Background Image</h2>
        <p>You can also set the `imgSrc` prop to draw on a background-image.</p>
        <p>
          It will automatically resize to fit the canvas and centered vertically
          & horizontally.
        </p>
        <CanvasDraw
          brushColor="rgba(155,12,60,0.3)"
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg"
        />

        <h2>Refreshable Background Image</h2>
        <p>This will refresh the background in every two seconds.</p>
        <CanvasDraw
          brushColor="rgba(155,12,60,0.3)"
          imgSrc={this.state.backgroundImg}
        />
        <h2>Hide UI</h2>
        <p>To hide the UI elements, set the `hideInterface` prop. You can also hide the grid with the `hideGrid` prop.</p>
        <CanvasDraw hideInterface hideGrid />
        <h2>Zoom & Pan</h2>
        <p>
          Set the <span>enablePanAndZoom</span> prop to enable mouse scrolling
          and panning (using Ctrl), pinch zooming, and two-finger panning. If
          you want to ensure that all lines stay within the bounds of the
          canvas, set the <span>clampLinesToDocument</span> property.
        </p>
        <CanvasDraw
          enablePanAndZoom
          clampLinesToDocument
          gridColor="#ccc"
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg"
        />
        <h2>Save & Load</h2>
        <p>
          This part got me most excited. Very easy to use saving and loading of
          drawings. It even comes with a customizable loading speed to control
          whether your drawing should load instantly (loadTimeOffset = 0) or
          appear after some time (loadTimeOffset > 0){" "}
          <span>{`<CanvasDraw loadTimeOffset={10} />`}</span>
        </p>
        <p>Try it out! Draw something, hit "Save" and then "Load".</p>
        <div className={classNames.tools}>
          <button
            onClick={() => {
              localStorage.setItem(
                "savedDrawing",
                this.saveableCanvas.getSaveData()
              );
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.eraseAll();
            }}
          >
            Erase
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.undo();
            }}
          >
            Undo
          </button>
          <button
            onClick={() => {
              console.log(this.saveableCanvas.getDataURL());
              alert("DataURL written to console")
            }}
          >
            GetDataURL
          </button>
          <div>
            <label>Width:</label>
            <input
              type="number"
              value={this.state.width}
              onChange={e =>
                this.setState({ width: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div>
            <label>Height:</label>
            <input
              type="number"
              value={this.state.height}
              onChange={e =>
                this.setState({ height: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div>
            <label>Brush-Radius:</label>
            <input
              type="number"
              value={this.state.brushRadius}
              onChange={e =>
                this.setState({ brushRadius: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div>
            <label>Lazy-Radius:</label>
            <input
              type="number"
              value={this.state.lazyRadius}
              onChange={e =>
                this.setState({ lazyRadius: parseInt(e.target.value, 10) })
              }
            />
          </div>
        </div>
        <CanvasDraw
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          brushColor={this.state.color}
          brushRadius={this.state.brushRadius}
          lazyRadius={this.state.lazyRadius}
          canvasWidth={this.state.width}
          canvasHeight={this.state.height}
        />
        <p>
          The following is a disabled canvas with a hidden grid that we use to
          load & show your saved drawing.
        </p>
        <button
          onClick={() => {
            this.loadableCanvas.loadSaveData(
              localStorage.getItem("savedDrawing")
            );
          }}
        >
          Load what you saved previously into the following canvas. Either by
          calling `loadSaveData()` on the component's reference or passing it
          the `saveData` prop:
        </button>
        <CanvasDraw
          disabled
          hideGrid
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={localStorage.getItem("savedDrawing")}
          loadTimeOffset={0.7}
        />
        <p>
          The saving & loading also takes different dimensions into account.
          Change the width & height, draw something and save it and then load it
          into the disabled canvas. It will load your previously saved
          masterpiece scaled to the current canvas dimensions.
        </p>
        <p>
          That's it for now! Take a look at the{" "}
          <a href="https://github.com/mBeierl/react-canvas-draw/tree/master/demo/src">
            source code of these examples
          </a>
          .
        </p>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));

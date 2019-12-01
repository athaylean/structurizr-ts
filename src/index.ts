import puppeteer from 'puppeteer'
import * as fs from 'fs'

var structurizr;

const url = 'https://structurizr.com/express';
const autoLayout = true;
const ignoreHTTPSErrors = false;
const headless = true;

const generate = async (workspaces, options) => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: ignoreHTTPSErrors,
    headless: headless
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForXPath("//*[name()='svg']");

  await page.evaluate((autoLayout) => {
    return structurizr.scripting.setAutoLayout(autoLayout);
  }, autoLayout);

  await page.evaluate(() => {
    // @ts-ignore
    return document.querySelector('#expressIntroductionModal > div.modal-dialog.modal-md > div > div.modal-footer > button').click();
  });

  await page.evaluate(() => {
    // @ts-ignore
    return openAutoLayoutModal();
  });


  await asyncForEach(workspaces, async (workspace) => {
    const filename = workspace.filename;
    const expressDiagramDefinition = JSON.stringify({...workspace, filename: undefined, options: undefined});

    await page.evaluate((expressDiagramDefinition) => {
      return structurizr.scripting.renderExpressDefinition(expressDiagramDefinition);
    }, expressDiagramDefinition);

    // @ts-ignore
    await page.evaluate((workspace) => document.getElementById("autoLayoutRankSeparation").value = `${workspace.options.separation.rank}`, workspace);
    // @ts-ignore
    await page.evaluate((workspace) => document.getElementById("autoLayoutNodeSeparation").value = `${workspace.options.separation.node}`, workspace);
    // @ts-ignore
    await page.evaluate((workspace) => document.getElementById("autoLayoutEdgeSeparation").value = `${workspace.options.separation.edge}`, workspace);

    await page.evaluate(() => {
      // @ts-ignore
      return runAutoLayout()
    });

    const generateKey = workspace.options.generateKey !== undefined ? workspace.options.generateKey : true;
    const path = workspace.options.path !== undefined ? workspace.options.path : '/'

    if (options.format === 'png') {
      await exportDiagramAndKeyToPNG(filename, path, page, generateKey);
    } else {
      await exportDiagramAndKeyToSVG(filename, path, page, generateKey);
    }
  })

  await browser.close();
};

async function exportDiagramAndKeyToPNG(filename, path, page, generateKey) {
  const diagramFilename = filename + '.png';
  const diagramKeyFilename = filename + '-key.png';

  const base64DataForDiagram = await page.evaluate(() => {
    return structurizr.scripting.exportCurrentDiagramToPNG({crop: false});
  });

  await fs.promises.mkdir(`out/${path}`, { recursive: true });

  console.log("Writing " + diagramFilename);
  fs.writeFile(`out/${path}/${diagramFilename}`, base64DataForDiagram.replace(/^data:image\/png;base64,/, ""), 'base64', function (err) {
    if (err) throw err;
  });

  if (generateKey) {
    const base64DataForKey = await page.evaluate(() => {
      return structurizr.scripting.exportCurrentDiagramKeyToPNG();
    });

    console.log("Writing " + diagramKeyFilename);
    fs.writeFile(`out/${path}/${diagramKeyFilename}`, base64DataForKey.replace(/^data:image\/png;base64,/, ""), 'base64', function (err) {
      if (err) throw err;
    });
  }
}

async function exportDiagramAndKeyToSVG(filename, path, page, generateKey) {
  const diagramFilename = filename + '.html';
  const diagramKeyFilename = filename + '-key.html';

  await fs.promises.mkdir(`out/${path}`, { recursive: true });

  const svgForDiagram = await page.evaluate(() => {
    return structurizr.scripting.exportCurrentDiagramToSVG();
  });

  console.log("Writing " + diagramFilename);
  fs.writeFile(`out/${path}/${diagramFilename}`, svgForDiagram, function (err) {
    if (err) throw err;
  });

  if (generateKey) {
    const svgForKey = await page.evaluate(() => {
      return structurizr.scripting.exportCurrentDiagramKeyToSVG();
    });

    console.log("Writing " + diagramKeyFilename);
    fs.writeFile(`out/${path}/${diagramKeyFilename}`, svgForKey, function (err) {
      if (err) throw err;
    });
  }
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default {
  generate
}

export {Workspace as Workspace} from "./lib";
export {WorkspaceType as WorkspaceType} from "./lib";
export {Separation as Separation} from "./lib";

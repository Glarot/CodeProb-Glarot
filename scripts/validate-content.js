#!/usr/bin/env node

/**
 * Content validation script for CodeProb
 * Validates that all content files exist and are properly structured
 */

const fs = require('fs');
const path = require('path');

function validateContent() {
    console.log('🔍 Validating CodeProb content...\n');
    
    let errors = 0;
    
    try {
        // Load contributor config
        const configPath = path.join(process.cwd(), 'contributor-config.json');
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        
        // Validate each content type
        const contentTypes = ['problems', 'concepts', 'articles'];
        
        for (const type of contentTypes) {
            console.log(`📁 Validating ${type}...`);
            
            const items = config.content[type] || [];
            const typeDir = path.join(process.cwd(), type);
            
            // Check if directory exists
            if (!fs.existsSync(typeDir)) {
                console.error(`❌ Directory missing: ${type}/`);
                errors++;
                continue;
            }
            
            // Check each content item
            for (const item of items) {
                const filePath = path.join(typeDir, item.filename);
                
                if (!fs.existsSync(filePath)) {
                    console.error(`❌ File missing: ${type}/${item.filename}`);
                    errors++;
                    continue;
                }
                
                // Basic HTML validation
                const content = fs.readFileSync(filePath, 'utf8');
                
                if (!content.includes('<!DOCTYPE html>')) {
                    console.error(`❌ Invalid HTML (missing DOCTYPE): ${type}/${item.filename}`);
                    errors++;
                }
                
                if (!content.includes(`<article class="${type.slice(0, -1)}"`)) {
                    console.error(`❌ Missing article element: ${type}/${item.filename}`);
                    errors++;
                }
                
                if (!content.includes(item.title)) {
                    console.error(`❌ Title mismatch: ${type}/${item.filename}`);
                    errors++;
                }
            }
            
            console.log(`✅ ${type}: ${items.length} items validated`);
        }
        
        // Check required files
        const requiredFiles = [
            'index.html',
            'writer.html',
            'assets/css/main.css',
            'assets/js/main.js',
            'assets/js/content-indexer.js'
        ];
        
        console.log('\n📄 Validating required files...');
        for (const file of requiredFiles) {
            if (!fs.existsSync(path.join(process.cwd(), file))) {
                console.error(`❌ Required file missing: ${file}`);
                errors++;
            }
        }
        
        console.log(`✅ Required files validated`);
        
    } catch (error) {
        console.error('❌ Validation failed:', error.message);
        errors++;
    }
    
    console.log(`\n📊 Validation complete: ${errors} errors found`);
    
    if (errors > 0) {
        process.exit(1);
    } else {
        console.log('🎉 All content is valid!');
    }
}

// Run validation
validateContent();